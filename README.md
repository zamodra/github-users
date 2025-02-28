## 📡 Live Site
Welcome to the **Git Repo Search** project! This is a Next.js-based application.  

🔗 **Live Site:** [https://hitopiatest.netlify.app/](https://zmdr-gitrepo-search.netlify.app/)

## 📡 About Repo
This application is using next.js 15 + app router without src

## 🚀 Prerequisites

Ensure you have the following installed before setting up the project:

- **Node.js**: (RECOMMENDED) Version **22.3.0** or higher.
- **npm**: Comes bundled with Node.js.

---

## 🔧 Initial Setup

1. **Clone the repository**  
   Replace `<repository-url>` with your actual repository link:

   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Install dependencies**  
   Run the following command to install required packages:

   ```bash
   npm install
   ```

---

## 🛠 Environment Variables

Before running the application, create a `.env` file in the root directory and add the following environment variables:

```env
NEXT_PUBLIC_CLIENT_SECRET=[GITHUB_TOKEN]
```

Replace the placeholder values with your actual configuration.

---

## ▶ Running Locally

Start the development server with:

```bash
npm run dev
```

By default, the application will be available at:  
🔗 [http://localhost:3000](http://localhost:3000)

If you need to run it on a different port, modify the script in `package.json` accordingly.

---

## 🧪 Running Tests Locally

To run tests in **watch mode**:

```bash
npm run test:watch
```

To run all tests once:

```bash
npm run test
```

---

## 📦 Production Build

To build and start the production version of the application:

1. **Build the application**:

   ```bash
   npm run build
   ```

2. **Start the application**:

   ```bash
   npm run start
   ```

By default, it will run on [http://localhost:3000](http://localhost:3000), but you can specify a different port by modifying the start command in `package.json`.

---

For redeployment, push changes to the main branch (or trigger a manual deploy in Netlify).

---
