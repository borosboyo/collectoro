import React from "react";
import ProfileModalComponent from "./modals/profile-modal.component";
import MyGroupsModalComponent from "./modals/my-groups-modal.component";
import CreateGroupModalComponent from "./modals/create-group-modal.component";
import JoinGroupModalComponent from "./modals/join-group-modal.component";

export function SidebarModalHolderComponent(props: {
    isProfileModalVisible: boolean,
    closeModal: () => void,
    isMyGroupsModalVisible: boolean,
    isCreateGroupModalVisible: boolean,
    isJoinGroupModalVisible: boolean
}) {
    return <>
        <ProfileModalComponent visible={props.isProfileModalVisible} onPress={props.closeModal}/>
        <MyGroupsModalComponent visible={props.isMyGroupsModalVisible} onPress={props.closeModal}/>
        <CreateGroupModalComponent visible={props.isCreateGroupModalVisible} onPress={props.closeModal}/>
        <JoinGroupModalComponent visible={props.isJoinGroupModalVisible} onPress={props.closeModal}/>
    </>
}
