/**
 * api.js — SerenityDecoded API client
 *
 * Usage:
 *   import { api } from './api';
 *   const { data } = await api.auth.adminLogin('admin@...', 'Admin@2026');
 *   api.setToken(data.token);
 *   const { data: users } = await api.users.list({ page: 1, perPage: 10 });
 */

const BASE_URL = "https://serenity-backend-f409.onrender.com"

// ── Token store ───────────────────────────────────────────────
// SECURITY NOTE
// -------------
// Auth tokens are primarily delivered as an httpOnly cookie (`sd_token`)
// set by the backend on /api/auth/admin/login & /api/auth/signup. We send
// `credentials: 'include'` on every fetch so the cookie travels with each
// request — and JS *cannot* read it (XSS-safe).
//
// The in-memory `_token` below is a fallback for environments where
// third-party cookies are blocked (e.g. some embedded webviews) or for
// non-browser callers (curl, mobile native). It lives only for the lifetime
// of the page — we deliberately do NOT persist it to sessionStorage /
// localStorage, since either is readable from JS and would defeat the
// httpOnly protection.
let _token = '';

const setToken = (t) => { _token = t || ''; };
const getToken = () => _token;
const clearToken = () => { _token = ''; };

// ── Core fetch ────────────────────────────────────────────────
const request = async (method, path, body, params) => {
  const url = new URL(`${BASE_URL}${path}`);
  if (params) Object.entries(params).forEach(([k,v]) => v !== undefined && url.searchParams.set(k, v));

  const headers = { 'Content-Type': 'application/json' };
  if (_token) headers['Authorization'] = `Bearer ${_token}`;

  const res = await fetch(url.toString(), {
    method,
    headers,
    credentials: 'include',  // send the httpOnly sd_token cookie
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw Object.assign(new Error(data.error || `HTTP ${res.status}`), { status: res.status, data });
  return data;
};

const get    = (path, params) => request('GET',    path, null, params);
const post   = (path, body)   => request('POST',   path, body);
const patch  = (path, body)   => request('PATCH',  path, body);
const del    = (path)         => request('DELETE', path);

// ── Auth ──────────────────────────────────────────────────────
const auth = {
  adminLogin:     (email, password)          => post('/api/auth/admin/login', { email, password }),
  userLogin:      (email, password)          => post('/api/auth/user/login',  { email, password }),
  userRegister:   (name, email, password, profile) => post('/api/auth/user/register', { name, email, password, profile }),
  me:             ()                         => get('/api/auth/user/me'),
  adminMe:        ()                         => get('/api/auth/admin/me'),
  logout:         ()                         => post('/api/auth/logout'),
  changePassword: (currentPassword, newPassword) => post('/api/auth/user/change-password', { currentPassword, newPassword }),
  forgetPassword: (email) => post('/api/auth/forgot-password', { email }),
  verifyEmailOtp: (email, otp) =>post('/api/auth/verify-reset', { email, otp }),
  resetPassword: (email, resetToken, newPassword) =>post('/api/auth/reset-password', { email, resetToken, newPassword }),

};

// ── Users ─────────────────────────────────────────────────────
const users = {
  list:    (params)      => get('/api/users', params),
  get:     (id)          => get(`/api/users/${id}`),
  update:  (id, body)    => patch(`/api/users/${id}`, body),
  delete:  (id)          => del(`/api/users/${id}`),
  bulk:    (ids, action) => post('/api/users/bulk', { ids, action }),
  exportCSV: ()          => `${BASE_URL}/api/users/export/csv`,
};

const insights = {
  today:        () => get('/api/insights/today'),

  list:         (params)   => get('/api/insights', params),

  create:       (body)     => post('/api/insights', body),

  bulkCreate:   (rows)     => post('/api/insights/bulk', { rows }),

  update:       (id, body) => patch(`/api/insights/${id}`, body),

  delete:       (id)       => del(`/api/insights/${id}`),

  rotate:       ()         => post('/api/insights/cron/rotate'),
};

// ── Community ─────────────────────────────────────────────────
const community = {
  // Groups
  list:          (params)         => get('/api/community', params),
  adminGroups: (params) => get('/api/community/admin/groups', params),
  get:           (id)             => get(`/api/community/${id}`),
  create:        (body)           => post('/api/community', body),
  update:        (id, body)       => patch(`/api/community/${id}`, body),
  delete:        (id)             => del(`/api/community/${id}`),
  join:          (id)             => post(`/api/community/${id}/join`),
  leave:         (id)             => post(`/api/community/${id}/leave`),
  toggleAdmin:   (id, userId)     => post(`/api/community/${id}/members/${userId}/toggle-admin`),
  removeMember:  (id, userId)     => del(`/api/community/${id}/members/${userId}`),
  // Messages
  getMessages:   (id, params)     => get(`/api/community/${id}/messages`, params),
  sendMessage:   (id, body)       => post(`/api/community/${id}/messages`, body),
  deleteMessage: (id, msgId)      => del(`/api/community/${id}/messages/${msgId}`),
  pinMessage:    (id, msgId)      => post(`/api/community/${id}/messages/${msgId}/pin`),
  react:         (id, msgId, emoji) => post(`/api/community/${id}/messages/${msgId}/react`, { emoji }),
  report:        (id, msgId)      => post(`/api/community/${id}/messages/${msgId}/report`),
  // Admin
  adminAll:      (params)         => get('/api/community/admin/all', params),
  adminReported: ()               => get('/api/community/admin/reported'),
  adminDismiss:  (msgId)          => post(`/api/community/admin/messages/${msgId}/dismiss`),
  adminFeed:     (params)         => get('/api/community/admin/feed', params),
  reportMessage: (id, msgId, body = {}) =>
  post(`/api/community/${id}/messages/${msgId}/report`, body),

reportChannel: (id, body = {}) =>
  post(`/api/community/channels/${id}/report`, body),
  // Admin Moderation
adminDeleteMessage: (groupId, msgId) =>
  del(`/api/community/${groupId}/messages/${msgId}`),

adminPinMessage: (groupId, msgId) =>
  post(`/api/community/${groupId}/messages/${msgId}/pin`),

adminDeleteGroup: (groupId) =>
  del(`/api/community/${groupId}`),

adminUpdateGroup: (groupId, body) =>
  patch(`/api/community/${groupId}`, body),

adminRemoveMember: (groupId, userId) =>
  del(`/api/community/${groupId}/members/${userId}`),
};

// ── Content ───────────────────────────────────────────────────
const content = {
  // Blog (public)
  blogList:      (params)  => get('/api/content/blog', params),
  blogGet:       (id)      => get(`/api/content/blog/${id}`),
  blogComment:   (id, body)=> post(`/api/content/blog/${id}/comments`, body),
  // Blog (admin)
  adminBlogList: (params)  => get('/api/content/admin/blog', params),
  adminBlogCreate:(body)   => post('/api/content/admin/blog', body),
  adminBlogUpdate:(id,body)=> patch(`/api/content/admin/blog/${id}`, body),
  adminBlogDelete:(id)     => del(`/api/content/admin/blog/${id}`),
  adminCommentApprove:(id,approved) => patch(`/api/content/admin/blog/comments/${id}`, { approved }),
  adminCommentDelete:(id)  => del(`/api/content/admin/blog/comments/${id}`),
  // FAQs
  faqList:       (params)  => get('/api/content/faqs', params),
  adminFaqList:  (params)  => get('/api/content/admin/faqs', params),
  adminFaqCreate:(body)    => post('/api/content/admin/faqs', body),
  adminFaqUpdate:(id,body) => patch(`/api/content/admin/faqs/${id}`, body),
  adminFaqDelete:(id)      => del(`/api/content/admin/faqs/${id}`),
  // Plans
  planList:      ()        => get('/api/content/plans'),
  // Site (public marketing content + stats)
  site:          ()        => get('/api/content/site'),
  siteStats:     ()        => get('/api/content/site-stats'),
  adminSiteSave: (body)    => patch('/api/content/admin/site', body),
  adminPlanList: ()        => get('/api/content/admin/plans'),
  adminPlanCreate:(body)   => post('/api/content/admin/plans', body),
  adminPlanUpdate:(id,body)=> patch(`/api/content/admin/plans/${id}`, body),
  adminPlanDelete:(id)     => del(`/api/content/admin/plans/${id}`),
  // Questions
  questionList:  ()        => get('/api/content/questions'),
  adminQuestionList:(params) => get('/api/content/admin/questions', params),
  adminQuestionCreate:(body)  => post('/api/content/admin/questions', body),
  adminQuestionUpdate:(id,body)=> patch(`/api/content/admin/questions/${id}`, body),
  adminQuestionDelete:(id) => del(`/api/content/admin/questions/${id}`),
};

// ── Communications ────────────────────────────────────────────
const communications = {
  // Templates
  templateList:   (params)  => get('/api/communications/templates', params),
  templateGet:    (id)       => get(`/api/communications/templates/${id}`),
  templateCreate: (body)     => post('/api/communications/templates', body),
  templateUpdate: (id, body) => patch(`/api/communications/templates/${id}`, body),
  templateDelete: (id)       => del(`/api/communications/templates/${id}`),
  templateTest:   (id, to)   => post(`/api/communications/templates/${id}/test`, { to }),
  // Schedules
  scheduleList:   (params)   => get('/api/communications/schedules', params),
  scheduleCreate: (body)     => post('/api/communications/schedules', body),
  scheduleUpdate: (id, body) => patch(`/api/communications/schedules/${id}`, body),
  scheduleDelete: (id)       => del(`/api/communications/schedules/${id}`),
  // Push
  pushList:   (params)  => get('/api/communications/push', params),
  pushSend:   (body)    => post('/api/communications/push', body),
  pushUpdate: (id,body) => patch(`/api/communications/push/${id}`, body),
  pushDelete: (id)      => del(`/api/communications/push/${id}`),
};

// ── Scheduler ─────────────────────────────────────────────────
const scheduler = {
  // Actions
  actionList:   (params)   => get('/api/scheduler/actions', params),
  actionCreate: (body)     => post('/api/scheduler/actions', body),
  actionUpdate: (id, body) => patch(`/api/scheduler/actions/${id}`, body),
  actionDelete: (id)       => del(`/api/scheduler/actions/${id}`),
  actionImport: (rows)     => post('/api/scheduler/actions/import', { rows }),
  // Crons
  cronList:   ()          => get('/api/scheduler/crons'),
  cronCreate: (body)      => post('/api/scheduler/crons', body),
  cronUpdate: (id, body)  => patch(`/api/scheduler/crons/${id}`, body),
  cronDelete: (id)        => del(`/api/scheduler/crons/${id}`),
  cronRun:    (id)        => post(`/api/scheduler/crons/${id}/run`),
  // Send & History
  sendNow:    (body)      => post('/api/scheduler/send-now', body),
  history:    (params)    => get('/api/scheduler/history', params),
};

// ── Admin accounts & config ───────────────────────────────────
const admin = {
  list:          (params)       => get('/api/admin', params),
  get:           (id)           => get(`/api/admin/${id}`),
  create:        (body)         => post('/api/admin', body),
  createUser: (body) => post('/api/users', body),
  getUserById: (id) => get(`/api/admin/users/${id}/details`),
  update:        (id, body)     => patch(`/api/admin/${id}`, body),
  delete:        (id)           => del(`/api/admin/${id}`),
  resetPassword: (id, password) => post(`/api/admin/${id}/reset-password`, { password }),
  updateProfile: (body)         => patch('/api/admin/me/profile', body),
  configAll:     ()             => get('/api/admin/config/all'),
  configSet:     (key, value)   => post('/api/admin/config', { key, value }),
  configBatch:   (obj)          => post('/api/admin/config/batch', obj),
  dashboardStats:()             => get('/api/admin/analytics'),
};
const notifications = {
  list:    ()       => get('/api/notifications'),
  read:    (id)     => post(`/api/notifications/${id}/read`),
  readAll: ()       => post('/api/notifications/readAll'),
};

// ── Contact Form ──────────────────────────────────────────────
const contact = {
submit: (body) => post('/api/contact-form', body),
};

// ── Export ────────────────────────────────────────────────────
export const api = {
  setToken, getToken, clearToken,notifications,insights,
  auth, users, community, content, communications, scheduler, admin, contact,
};
