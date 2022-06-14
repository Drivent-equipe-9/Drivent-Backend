import { Router } from 'express';
import axios from 'axios';

import { notFoundError } from '@/errors';

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

  if (userResponse.data.email === null) {
    throw notFoundError();
  }
  //const user = await userRepository.create(userResponse.data.email1);
  //await tokenRepository.create(token, userId);

  // verificar email null (userResponse.data.email)
  // criar o usuario
  // deixar senha null
  // cria session
  // retorna token da session
});

export { oauthGitHubRouter };
