import { FC } from 'react';

interface SelfChatProps {
    msg: string;
}

const SelfChat: FC<SelfChatProps> = ({ msg }) => {
    console.log('self', msg);
    return (
        <div className="flex justify-end mb-2">
            <div className="bg-primary text-white rounded-l-xl rounded-b-xl overflow-hidden bg-primary">
                <h1 className="px-5 py-3 font-abhaya">{msg}</h1>
            </div>
        </div>
    );
};

export default SelfChat;
