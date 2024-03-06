import React from 'react';
import { Layout, theme } from 'antd';
import Sidebars from "./Sidebars";
import {Content} from "antd/es/layout/layout";
import OpenConversations from "./OpenConversations";
import {useConversations} from "../contexts/ConversationsProvider";
import OpenPosts from "./OpenPosts";
import {usePosts} from "../contexts/PostsProvider";

const Dashboard = ({id}) => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const {selectedConversation,selectedConversationIndex} = useConversations()
    const {openPosts} = usePosts()
    const getContentView=()=>{
        if(selectedConversation!=null&&selectedConversationIndex !== 'posts'){
            return(
                    <OpenConversations/>
            )
        }else{
            return (
                    <OpenPosts/>
            )
        }

    }
    return (
            <Layout
                style={{
                    minHeight: '100vh',
                }}>
                <Sidebars id={id}/>
                <Layout
                    style={{
                        minHeight: '100vh',
                    }}
                >
                    <Content>
                        {getContentView()}
                    </Content>
                </Layout>
            </Layout>
    );
};
export default Dashboard;