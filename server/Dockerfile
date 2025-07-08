# Use a Node base image
FROM node:20

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install

# Copy the rest of the code
COPY . .

# Build TypeScript
RUN pnpm build

# Start the app
CMD ["node", "dist/infra/http/server.mjs"]
