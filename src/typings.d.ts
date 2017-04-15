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
  isMain?: boolean,
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
  title?: string,
  paragraph?: string,
  link?: string,
  href?: string
}

interface FieldProps {
  id: string,
  name?: string,
  type?: string,
  value?: string,
  placeholder?: string,
  required?: boolean
}

interface FolioItemProps {
  href: string,
  heading: string,
  imageSrc: string,
  imageAlt: string,
  bgColor: string
}

interface FolioProps {
  heading?: string,
  href?: string,
  items?: Array<FolioItemProps>
}

interface ExcerptProps {
  title: string,
  date: number,
  href: string,
  body: string
}

interface FooterProps {
  isHirable?: boolean
}

interface HeroProps {
  heading?: string
}

interface IconProps {
  id: string
}

interface LabelProps {
  text: string,
  field?: string
}

interface NavItemProps {
  text: string,
  href: string,
  order: number,
  priority: number
}

interface NavProps {
  heading?: string,
  items?: Array<NavItemProps>
}

interface PostProps {
  classList?: Array<string>,
  children?: any
}

interface SectorProps {
  alt?: boolean,
  rtl?: boolean,
  heading: string,
  subheading: string,
  description: string,
  button: ButtonProps
}

interface SectorsProps {
  items?: Array<SectorProps>
}

interface SmallProps {
  children?: any
}

interface StarProps {
  id?: string,
  blink?: boolean
}

interface StepsItemProps {
  href: string,
  heading: string,
  description: string,
  button?: ButtonProps
}

interface StepsProps {
  items: Array<StepsItemProps>
}

interface TimeProps {
  date: number
}
