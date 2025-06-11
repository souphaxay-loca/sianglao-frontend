FROM node:18-alpine

WORKDIR /app

# Copy package files for better layer caching
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Expose port
EXPOSE 3000

# Set environment for development
ENV NODE_ENV=development

# Start dev server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]