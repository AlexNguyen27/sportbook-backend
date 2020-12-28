import moment from 'moment';

export const ROLE = {
  admin: 'admin',
  user: 'user',
  owner: 'owner',
};

export const GENDER = {
  male: 'male',
  female: 'female',
};

export const FAVORITE_FOOT = {
  right: 'right',
  left: 'left',
  both: 'both',
};

export const SUB_GROUND_STATUS = {
  ready: 'ready',
  reserved: 'reserved',
};

export const PAYMENT_TYPE = {
  online: 'online',
  offline: 'offline',
};

export const ORDER_STATUS = {
  // eslint-disable-next-line @typescript-eslint/camelcase
  waiting_for_approve: 'waiting_for_approve', // wait for owner to approved
  cancelled: 'cancelled', // owner cancell order or  out of time
  finished: 'finished', // DONE

  // TODO THESE STATUS CAN'T CREATE ORDER (SAME SUB GROUND, STARTDAY, STARTTIME, ENDTIME)
  paid: 'paid', // paid order
  approved: 'approved', // owner approve and now waiting for paid
};

// CATEGORY AND BENEFIT
export const BENEFIT_STATUS = {
  enabled: 'enabled',
  disabled: 'disabled',
};

// SUB GROUND AND GROUND
export const GROUND_STATUS = {
  public: 'public',
  private: 'private',
};

// USER
export const USER_STATUS = {
  active: 'active',
  disabled: 'disabled',
};

// moment('2010-10-20').isBefore('2010-10-21'); // true
export const isBeforeDate = (startTime: any, selectedStartDay: any) => {
  const day = `${selectedStartDay} ${startTime}`;
  console.log(moment().add(7, 'hours').isAfter((moment(day, 'DD-MM-YYYY HH:mm:ss+00:00'))), moment().add(7, 'hours'), (moment(day, 'DD-MM-YYYY HH:mm:ss+00:00')));
  return moment().add(7, 'hours').isAfter((moment(day, 'DD-MM-YYYY HH:mm:ss+00:00')));
};
