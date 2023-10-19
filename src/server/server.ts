import express from "express";
import cors from "cors";
import routes from "./routes";
import { configurePassport } from "./middlewares/wow-passport";
import { useExpression } from "./middlewares/expression";

const isProduction = process.env.NODE_ENV === "production";
const isDevelopment = process.env.NODE_ENV === "development";

const app = express();
useExpression(app);
configurePassport(app);
app.use(express.json());

app.use(routes);

if (isDevelopment) {
    app.use(cors());
}

if (isProduction) {
    app.use(express.static("public"));
}

app.get("/", function (req, res) {
    if (req.isAuthenticated()) {
        const output = `
      <html>
        <body>
          <h1>Express Passport-Bnet OAuth Example</h1>
          <table>
            <tr>
              <th>Account ID</th>
              <th>Battletag</th>
            </tr>
            <tr>
              <td>${req.user.id}</td>
              <td>${req.user.battletag}</td>
            </tr>
          </table>
          <br />
          <a href="/logout">Logout</a>
        </body>
      </html>
    `;
        res.send(output);
    } else {
        const output = `
      <html>
        <body>
          <h1>Express Passport-Bnet OAuth Example</h1>
          <br />
          <a href="/oauth/battlenet">Login with Bnet</a>
        </body>
      </html>
    `;
        res.send(output);
    }
});

// all our api routes
app.get("/api/hello", (req, res) => {
    res.json({ message: "World" });
});

// 404 fallback for client side routing
if (isProduction) {
    app.get("*", (req, res) => {
        res.sendFile("index.html", { root: "public" });
    });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
