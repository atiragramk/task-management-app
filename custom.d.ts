declare module "*.jpg" {
  const content: any;
  export default content;
}

declare module "*.png" {
  const content: any;
  export default content;
}

declare module "*.gif" {
  const content: any;
  export default content;
}

declare module "@mui/material/styles" {
  interface Theme {
    priority: {
      low: string;
    };
  }
  interface ThemeOptions {
    priority?: {
      low?: string;
    };
  }
}
