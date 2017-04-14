declare module "*.json" {
  const value: any;
  export default value;
}

interface BioProps {
  imageSrc?: string,
  imageSrcset?: string,
  imageAlt?: string,
  title?: string,
  href?: string,
  text?: string
}

interface BlockProps {
  main?: boolean,
  classList?: Array<string>
}

interface BlogItemProps {
  id: string,
  title: string,
  href: string,
  date: number
}

interface BlogProps {
  heading?: string,
  items?: Array<BlogItemProps>
}

interface ButtonLabelProps {
  text: string
}

interface ButtonProps {
  text: string,
  href?: string,
  name?: string,
  submit?: boolean,
  bg1?: boolean,
  bg2?: boolean,
  shadow?: boolean
}

interface ClientsItemProps {
  id: any,
  quote: string,
  cite: string,
  href: string
}

interface ClientsProps {
  heading?: string,
  blockquotes: Array<ClientsItemProps>,
  button: ButtonProps
}

interface CTAProps {
  title: string,
  paragraph: string,
  link: string,
  href: string
}
