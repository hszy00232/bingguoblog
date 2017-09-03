'use strict';

exports.__esModule = true;
exports.default = {
  USER_NOT_LOGIN: [403, '未登录'],
  USER_EXIST: [100, '用户已经存在'],
  USER_NO_PERMISSION: [101, '没有权限'],
  PARAMS_ERROR: [102, '参数错误'],
  DATA_EMPTY: [103, '数据不能为空'],
  ACCOUNT_ERROR: [104, '用户名或者密码错误'],
  CATE_EXIST: [105, '分类名称或者缩略名已经存在'],
  TAG_EXIST: [106, '标签名称或者缩略名已经存在'],
  TWO_FACTOR_AUTH_ERROR: [107, '两步校验码错误'],
  TWO_FACTOR_AUTH_ERROR_DETAIL: [107, '两步校验码错误，请确认校验码或服务器时间是否正确'],
  APP_KEY_SECRET_ERROR: [108, '推送公钥或者私钥错误']
};