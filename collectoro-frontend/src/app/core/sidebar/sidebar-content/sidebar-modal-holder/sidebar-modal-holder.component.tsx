import React from "react";
import ProfileModalComponent from "./modals/profile-modal.component";
import MyGroupsModalComponent from "./modals/my-groups-modal.component";
import CreateGroupModalComponent from "./modals/create-group-modal.component";
import JoinGroupModalComponent from "./modals/join-group-modal.component";
import {GetProfileByUserEmailResp, GroupEntity} from "../../../../../../swagger";

export function SidebarModalHolderComponent(props: {
    isProfileModalVisible: boolean,
    closeModal: () => void,
    isMyGroupsModalVisible: boolean,
    isCreateGroupModalVisible: boolean,
    isJoinGroupModalVisible: boolean
    profile: GetProfileByUserEmailResp,
    groups: Array<GroupEntity>
}) {
    return <>
        <ProfileModalComponent profile={props.profile} visible={props.isProfileModalVisible}
                               onPress={props.closeModal}/>
        <MyGroupsModalComponent groups={props.groups} visible={props.isMyGroupsModalVisible}
                                onPress={props.closeModal}/>
        <CreateGroupModalComponent visible={props.isCreateGroupModalVisible} onPress={props.closeModal}/>
        <JoinGroupModalComponent visible={props.isJoinGroupModalVisible} onPress={props.closeModal}/>
    </>
}
