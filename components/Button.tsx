import { ReactNode, FC, ButtonHTMLAttributes } from "react"

type ButtonProps = {
    children: ReactNode;
    styles?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>

const Button: FC<ButtonProps> = ({ children, styles = "", ...otherProps }) => {
  return (
		<button 
			className={`flex justify-center text-sm text-purple-500 w-full hover:text-white ${styles}`} 
			{...otherProps}
		>
			{children}
		</button>
  )
}

export default Button;
