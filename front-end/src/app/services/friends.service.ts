import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { FriendShip } from '../models/FriendShip.model';
import { RelationShips } from '../models/RelationShips.model';
import { UserServices } from './user.service';
import { AuthService } from './auth.service';
import { MiniProfile } from '../models/MiniProfile.model';
import { User } from '../models/User.model';

@Injectable({
  providedIn: 'root',
})
export class FriendsService {
  UserRelationShips: RelationShips;
  allNeededProfiles: MiniProfile[];
  myId: number;

  constructor(
    private http: HttpClient,
    private userService: UserServices,
    private authService: AuthService
  ) {}

  getRelationShips() {
    return this.http.get<RelationShips>(
      environment.rootUrl + '/api/relationships'
    );
  }

  private _getMyId(): Promise<number> {
    return new Promise((resolve, reject) => {
      this.authService
        .getAuthenticatedUser()
        .then((user: User) => {
          resolve(user.id);
          reject(Error('getAuthenticatedUser get Rejected'));
        })
        .catch((error) => console.log(error));
    });
  }

  _getMyFriendsProfiles(myFriends: FriendShip[]): Promise<MiniProfile[]> {
    return new Promise(async (resolve, reject) => {
      const myId = await this._getMyId();
      this.myId = myId;
      let myFriendsProfiles: MiniProfile[] = [];
      if (myFriends && myFriends.length > 0) {
        for (const friendship of myFriends) {
          const profile: MiniProfile = await this.userService
            .getMiniProfile(
              friendship.firstUserId == myId
                ? friendship.secondUserId
                : friendship.firstUserId
            )
            .toPromise();
          myFriendsProfiles.push(profile);
        }
        resolve(myFriendsProfiles);
      } else resolve(null);
    });
  }

  _getMyPendingRequestsProfiles(
    myPendingRequests: FriendShip[]
  ): Promise<MiniProfile[]> {
    return new Promise(async (resolve, reject) => {
      const myId = await this._getMyId();
      this.myId = myId;
      let myPendingRequestsProfile: MiniProfile[] = [];
      if (myPendingRequests && myPendingRequests.length > 0) {
        for (const friendship of myPendingRequests) {
          const profile: MiniProfile = await this.userService
            .getMiniProfile(
              friendship.firstUserId == myId
                ? friendship.secondUserId
                : friendship.firstUserId
            )
            .toPromise();
          myPendingRequestsProfile.push(profile);
        }
        resolve(myPendingRequestsProfile);
      } else resolve(null);
    });
  }

  _getBlockedByMeListProfiles(blockList: FriendShip[]): Promise<MiniProfile[]> {
    return new Promise(async (resolve, reject) => {
      const myId = await this._getMyId();
      this.myId = myId;
      let blockedByMeList: MiniProfile[] = [];
      if (blockList && blockList.length > 0) {
        for (const friendship of blockList) {
          const profile: MiniProfile = await this.userService
            .getMiniProfile(
              friendship.firstUserId == myId
                ? friendship.secondUserId
                : friendship.firstUserId
            )
            .toPromise();
          blockedByMeList.push(profile);
        }
        resolve(blockedByMeList);
      } else resolve(null);
    });
  }

  sendFriendRequest(requested_user_Id: number) {
    return this.http.post<FriendShip>(
      environment.rootUrl + '/api/friend-request',
      requested_user_Id
    );
  }

  cancelFriendRequest(requestedFriendId: number) {
    return this.http.post<boolean>(
      environment.rootUrl + '/api/cancel-request',
      requestedFriendId
    );
  }

  acceptFriendRequest(requester_user_Id: number) {
    return this.http.put(
      environment.rootUrl + '/api/friend-request',
      requester_user_Id
    );
  }

  blockFriend(blocked_user_id: number) {
    return this.http.put<boolean>(
      environment.rootUrl + '/api/friendship',
      blocked_user_id
    );
  }

  unblockFriend(blocked_user_id: number) {
    return this.http.put<boolean>(
      environment.rootUrl + '/api/friendship/friend',
      blocked_user_id
    );
  }
}
