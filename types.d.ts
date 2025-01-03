import "nativewind";

declare module "nativewind" {
  export function useColorScheme(): {
    setColorScheme(scheme: "light" | "dark" | "system"): void;
    toggleColorScheme(): void;
    colorScheme: "light" | "dark";
  };
}
