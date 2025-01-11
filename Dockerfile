FROM node:23-alpine

WORKDIR /ProjectTemisFront

COPY package*.json .

RUN npm install

COPY . .

# Dá permissão de execução ao script
RUN chmod +x /ProjectTemisFront/start.sh

EXPOSE 80:3000

CMD ["sh", "/ProjectTemisFront/start.sh"]