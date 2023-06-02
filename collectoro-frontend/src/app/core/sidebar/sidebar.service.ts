import {GroupControllerApiFactory, UserControllerApiFactory} from "../../../../swagger";
import {axiosConfig, baseOptions} from "../../shared/axios-config";

const SidebarService = {
    userController: UserControllerApiFactory(axiosConfig),
    groupController: GroupControllerApiFactory(axiosConfig),

    getProfileByUserEmail: function(email: string): Promise<any> {
        return this.userController.getProfileByUserEmail({
            email: email
        }, baseOptions)
    },

    createGroup: function (name: string, email: string | null ): Promise<any> {
        if(email != null) {
            return this.groupController.createGroup({
                name: name,
                userEmail: email
            }, baseOptions)
        } else {
            throw new Error("Email is undefined");
        }
    },

    joinGroup: function (joinLink: string, email: string | null ): Promise<any> {
        if(email != null) {
            return this.groupController.joinGroup({
                userEmail: email,
                joinLink: joinLink
            }, baseOptions)
        } else {
            throw new Error("Email is undefined");
        }
    },

    leaveGroup: function (groupId: number | undefined, email: string | null ): Promise<any> {
        if(email != null && groupId != null) {
            return this.groupController.leaveGroup({
                userEmail: email,
                groupId: groupId
            }, baseOptions)
        } else {
            throw new Error("Email is undefined");
        }
    }
}
export default SidebarService;