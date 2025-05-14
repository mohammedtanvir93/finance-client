interface IProps {
    message: string | undefined;
}

const ErrorMsg = ({ message }: IProps) => {
    if (message)
        return <p className="mt-1 text-sm text-red-500">{message}</p>;
};

export default ErrorMsg;
