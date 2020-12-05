import { AuthenticationError } from 'apollo-server';
import User from '../models/user.model';
import CommentModel from '../models/comment.model';
import { ExistsError } from '../components/errors';
import UserService from './user.service';
import GroundService from './ground.service';

class CommentService {
  static getCommentsbyGroundId({ groundId }: { groundId: string }) {
    return CommentModel.findAll({
      include: [
        {
          model: User,
          as: 'user',
        },
      ],
      where: { groundId },
      order: [
        ['createdAt', 'DESC'],
      ],
    });
  }

  static async createComment(data: any) {
    const { userId, groundId } = data;

    // CHECK IF USERID AND groundId IS EXITS
    await UserService.findUserById(userId);
    await GroundService.checkGroundIdExit({ id: groundId });

    if (data.parentId) {
      await this.findCommentById(data.parentId, 'Parent comment id not found');
    }

    return CommentModel.create({
      ...data,
    });
  }

  static findCommentById(id: string, message = 'Comment not found') {
    return CommentModel.findOne({ where: { id } }).then((cmt) => {
      if (!cmt) throw new ExistsError(message);
      return { ...cmt.toJSON() };
    });
  }

  static async updateComment(data: any, user: any) {
    const { id } = data;
    const currentCmt: any = await this.findCommentById(id);
    if (currentCmt.userId !== user.userId && user.role === 'user') {
      throw new AuthenticationError('Your role is not allowed');
    }

    await CommentModel.update(data, { where: { id } });

    const currentComment = await this.findCommentById(id);
    return currentComment;
  }

  static async deleteComment({ id }: { id: string }) {
    await this.findCommentById(id);

    await CommentModel.destroy({ where: { id } });
    return {
      status: 200,
      message: 'Delete successfully',
    };
  }
}

export default CommentService;
