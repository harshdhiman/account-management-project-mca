import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./auth/auth-provider";
import { NoAuthContainer } from "./auth/ui/no-auth-container";
import { AccountBookProvider } from "./providers/account-books/account-book-provider";
import { LicenseProvider } from "./providers/licensing/license-provider";
import { ThemeProvider } from "./relic-ui/theme/theme-provider";
import { Home } from "./screens/home";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider noAuthChildren={<NoAuthContainer />}>
        <LicenseProvider>
          <AccountBookProvider>
            <Home />
          </AccountBookProvider>
        </LicenseProvider>
      </AuthProvider>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
