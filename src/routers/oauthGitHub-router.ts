import { Router } from 'express';
import axios from 'axios';

import { notFoundError } from '@/errors';
import userRepository from '@/repositories/user-repository';
import authenticationService from '@/services/authentication-service';
import httpStatus from 'http-status';

const oauthGitHubRouter = Router();

oauthGitHubRouter.post('/oauth/github/login', async (req, res) => {
  const { code } = req.body;
  const response = await axios.post(`https://github.com/login/oauth/access_token`, {
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_CLIENT_SECRET,
    code,
  });

  const token = response.data.replace('&scope=&token_type=bearer', '').replace('access_token=', '');

  const userResponse = await axios.get('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (userResponse.data.email === null) throw notFoundError();

  const userData = userResponse.data;

  let registeredUser = await userRepository.findByEmail(userData.email);

  if (registeredUser === null) {
    const createUserData = { email: userData.email, password: '' };
    registeredUser = await userRepository.create(createUserData);

    const authentication = await authenticationService.createSession(registeredUser.id);

    const resData = {
      user: { userId: registeredUser.id, email: registeredUser.email },
      token: authentication,
    };

    res.status(httpStatus.OK).send(resData);
  } else {
    const sessionToken = await authenticationService.findSessionByUserId(registeredUser.id);

    const resData = {
      user: { userId: registeredUser.id, email: registeredUser.email },
      token: sessionToken,
    };

    res.status(httpStatus.OK).send(resData);
  }
});

export { oauthGitHubRouter };
