import { Resolvers } from '../types/graphql.type';
import { middleware, tokenValidation } from '../components';
import { ROLE } from '../components/constants';
import HistoryService from '../services/history.service';

const resolver: Resolvers = {
  Query: {
    histories: middleware(
      tokenValidation(ROLE.admin, ROLE.owner),
      (_: any, args: any) => HistoryService.getHistory(args),
    ),
  },

};

export default resolver;
