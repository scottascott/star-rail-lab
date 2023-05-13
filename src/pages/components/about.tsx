import { Modal } from "antd";
import { LinkedinOutlined } from "@ant-design/icons";
interface AboutModalProps {
    isModalOpen: boolean;
    handleOk: () => void;
    handleCancel: () => void;
    t: (x: string) => string;
}
const About = (props: AboutModalProps) => {
    const { isModalOpen, handleOk, handleCancel, t } = props;
    return (
        <Modal
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            centered
            closable={false}
            footer={
                <div className="pb-[20px] flex justify-center">
                    <div
                        className="cursor-pointer px-[40px] py-[5px] text-white bg-[#ffcd29] rounded-full"
                        onClick={handleOk}
                    >
                        ✓
                    </div>
                </div>
            }
        >
            {/* title */}
            <div className="w-full h-[40px] rounded-t-[30px] bg-[#fff7df] pt-[5px] text-[20px] text-center UbuntuBold ">
                {t("About")}
            </div>
            <div className="flex justify-center pr-[20px] pt-[20px] ">
                <div className="text-right mr-[10px]">
                    <p>{t("Creator")}: </p>
                    <p>{t("Release date")}: </p>
                </div>
                <div className="text-left UbuntuBold ">
                    <p>
                        <a
                            className="hover:text-[#ffcd29] "
                            href="https://www.linkedin.com/in/scott-wang-a1b129210/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Scott Wang <LinkedinOutlined />
                        </a>
                    </p>
                    <p>2023/5/14</p>
                </div>
            </div>
        </Modal>
    );
};
export default About;
