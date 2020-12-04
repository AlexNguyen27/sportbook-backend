import { Op } from 'sequelize';
import RatingModel from '../models/rating.model';
import { MutationCreateOrUpdateRatingArgs, MutationUpdateRatingArgs } from '../types/graphql.type';
import GroundService from './ground.service';
import UserService from './user.service';

class RatingService {
  static getRatings(filter: any) {
    return RatingModel.findAll({
      where: {
        groundId: filter.groundId
      }
    })
  }

  static async createOrUpdateRating({ userId, point, groundId }: MutationCreateOrUpdateRatingArgs) {
    const exitsRating: any = await this.findRatingByUserIdGroundId({ userId, groundId });

    // CHECK IF USER ID AND GROUND ID EXITS
    await GroundService.checkGroundIdExit({ id: groundId });
    await UserService.findUserById(userId);
    // GET REACTION TYPE

    if (exitsRating) {
      // update rating
      return this.updateRating({ userId, point, groundId });
    }

    // create rating
    const newRating = await RatingModel.create({ userId, groundId, point });
    if (newRating) return { status: 200, message: 'Create successfully' };
  }

  static findRatingByUserIdGroundId({ userId, groundId }: { userId: string; groundId: string }) {
    return RatingModel.findOne(
      {
        where:
        {
          [Op.and]: [
            { userId },
            { groundId },
          ],
        },
      }
    ).then((reaction) => {
      if (!reaction) return null;
      return { ...reaction.toJSON() };
    });
  }

  // NOT USER YET
  // static findReactionByUserIdgroundIdReactionTypeId(
  // { userId, reactionTypeId, groundId }: { userId: string, reactionTypeId: string, groundId: string }) {
  //   return Reaction.findOne(
  //     {
  //       where:
  //       {
  //         [Op.and]: [
  //           { userId },
  //           { groundId },
  //           { reactionTypeId }
  //         ]
  //       }
  //     }).then((reaction) => {
  //       console.log(reaction);
  //       if (!reaction) return;
  //       return { ...reaction.toJSON() };
  //     });
  // }

  static async updateRating({ userId, point, groundId }: MutationUpdateRatingArgs) {
    await RatingModel.update({ point }, {
      where:
      {
        [Op.and]: [
          { userId },
          { groundId },
        ],
      },
    });

    // TODO : should I return value
    return this.findRatingByUserIdGroundId({ userId, groundId });
  }

  //
  static async deleteRating({ userId, groundId }: { userId: string; groundId: string }) {
    await RatingModel.destroy({
      where:
      {
        [Op.and]: [
          { userId },
          { groundId },
        ],
      },
    });
    return {
      status: 200,
      message: 'Delete successfully',
    };
  }
}

export default RatingService;
