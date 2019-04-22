import DeleteUserType from '../../types/siteadmin/DeleteUserType';
import { User, UserLogin, UserClaim, UserProfile, Threads } from '../../models';

import {
  GraphQLList as List,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
} from 'graphql';

const deleteUser = {

  type: DeleteUserType,

  args: {
    userId: { type: new NonNull(StringType) },
  },

  async resolve({ request }, { userId }) {

    if(request.user && request.user.admin == true) {

      let isUserDeleted = false;
      let isUserProfileDeleted = false;

      // Delete UserProfile Data
      const deleteUserProfile = await UserProfile.destroy({
          where: {
            userId: userId
          }
      })
      .then(function(instance){

        // Check if any rows are affected
        if(instance > 0) {
          isUserProfileDeleted = true;
        }
      });


      // Remove Thread Items
      const removeThreads = await Threads.destroy({
        where: {
          $or: [
              {
                host: userId
              },
              {
                guest: userId
              }
          ]
        }
      });

      // Delete UserProfile only if User is deleted
      if(isUserProfileDeleted === true) {

        // Delete User Data
        const deleteUser = await User.destroy({
            where: {
              id: userId
            }
        })
        .then(function(instance){

          // Check if any rows are affected
          if(instance > 0) {
            isUserDeleted = true;
          }
        });

      }

      // Check Both Tables are deleted
      if(isUserDeleted === true && isUserProfileDeleted === true) {
        return {status: "success"};
      } else {
          return {status: "failed"};
      }
    } else {
        return {status: "failed"};
    }
    
  },
};

export default deleteUser;
