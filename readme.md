# Panda App

Panda is a money management app that focuses on giving the user data driven insights into their finances.

## Requirements

- npm
- An Azure B2C account

### Installing Dependencies

```bash
npm install
```

### Copying environment files

```bash
# Dev
cp ./src/environments/environment.example.ts ./src/environments/environment.ts

# Production
cp ./src/environments/environment.example.ts ./src/environments/environment.prod.ts
```

### Run the app locally

```bash
ionic serve
```

### Build for production

```bash
ionic build --prod
```
