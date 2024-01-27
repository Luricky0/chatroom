import React from 'react';
import { Layout, theme } from 'antd';
import Sidebars from "./Sidebars";
import {Content} from "antd/es/layout/layout";
import OpenConversations from "./OpenConversations";
import {useConversations} from "../contexts/ConversationsProvider";

const Dashboard = ({id}) => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const {selectedConversation} = useConversations()
    return (
            <Layout
                style={{
                    minHeight: '90vh',
                }}>
                <Sidebars id={id}/>
                <Layout>
                    <Content>
                        { selectedConversation && <OpenConversations/> }
                    </Content>
                </Layout>
            </Layout>
    );
};
export default Dashboard;