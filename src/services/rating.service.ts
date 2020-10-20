import { Op } from 'sequelize';
import RatingModel from '../models/rating.model';
import { MutationCreateRatingArgs, MutationUpdateRatingArgs } from '../types/graphql.type';

class RatingService {
  static async createRating({ userId, point, groundId }: MutationCreateRatingArgs) {
    const changeReactionType: any = await this.findRatingByUserIdGroundId({ userId, groundId });

    // CHECK IF USER ID AND GROUND ID EXITS
    // GET REACTION TYPE

    if (changeReactionType) {
      return this.deleteRating({ userId, groundId });
    }

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
