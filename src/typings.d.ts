declare module "*.json" {
  const value: any;
  export default value;
}

interface ButtonLabelProps {
  text: string
}

interface ButtonProps {
  text: string,
  href?: string,
  submit?: boolean,
  bg1?: boolean,
  bg2?: boolean,
  shadow?: boolean
}

interface CTAProps {
  title: string,
  paragraph: string,
  link: string,
  href: string
}