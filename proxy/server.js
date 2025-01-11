import express from 'express';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();
const PORT = process.env.PORT || 5500;

app.use(cors());

app.use(
  '/api',
  createProxyMiddleware({
    target: 'https://api.langflow.astra.datastax.com',
    pathRewrite: {
      '^/api': '/lf/efde00ae-4d32-4471-8e8d-26482560f5a9/api/v1/run/789d10ee-9573-4333-8fe2-52c048315d3d',
    },
    secure: false,
    changeOrigin: true,
    onProxyReq: (proxyReq, req) => {
      // Filtra cabeçalhos desnecessários
      const headersToKeep = ["Authorization", "Content-Type"];
      headersToKeep.forEach(header => {
        if (req.headers[header.toLowerCase()]) {
          proxyReq.setHeader(header, req.headers[header.toLowerCase()]);
        }
      });
    },
  })
);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});