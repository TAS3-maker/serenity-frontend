import { useState, useMemo } from "react";
import {
  Users,
  MessageSquare,
  Flag,
  Trash2,
  Settings,
  Eye,
  Plus,
  ShieldCheck,
  UserX,
  Search,
} from "../../../lib/icons";

import { C } from "../../../tokens";
import { api } from "../../../lib/api";
import { useApi } from "../../../lib/useApi";

import {
  Button,
  Badge,
  Card,
  Modal,
  Confirm,
  Toggle,
  Input,
  Select,
  SearchBar,
  Pager,
} from "../../ui/index";

import { Table } from "../../ui/Table";

const PER = 10;

// ───────────────── helpers ─────────────────
const getUserById = (u) =>
  !u || u === 0
    ? {
        id: 0,
        name: "SerenityDecoded (Platform)",
        email: "team@serenitydecoded.com",
      }
    : typeof u === "object"
    ? {
        id: u._id || u.id,
        name: u.name || "Member",
        email: u.email || "",
      }
    : {
        id: u,
        name: "Member",
        email: "",
      };

const totalReactions = (msgs = []) =>
  msgs.reduce(
    (sum, m) =>
      sum +
      Object.values(m.reactions || {}).reduce((a, b) => a + b, 0),
    0
  );

const formatDate = (d) => {
  if (!d) return "—";

  try {
    return new Date(d).toLocaleString();
  } catch {
    return "—";
  }
};

// ───────────────── stats pill ─────────────────
const StatPill = ({ label, value, color }) => (
  <div
    className="rounded-2xl p-5 border"
    style={{
      background: "var(--adminCard)",
      borderColor: "var(--border)",
      borderTop: `3px solid ${color}`,
    }}
  >
    <div
      className="font-display font-bold text-[28px] leading-none mb-1"
      style={{ color }}
    >
      {value}
    </div>

    <div className="text-[12px] text-[var(--textMuted)]">
      {label}
    </div>
  </div>
);

// ───────────────── chat modal ─────────────────
const ChatModal = ({
  open,
  onClose,
  group,
  messages,
  onDeleteMsg,

  onWarnUser,
  onReportMsg,
  showToast,
}) => {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("all");

  const msgs = messages[group?.id] || [];

  const filtered = useMemo(() => {
    if (filter === "reported")
      return msgs.filter((m) => (m.reportCount || 0) > 0);

   

    return msgs;
  }, [msgs, filter]);

  const paged = filtered.slice((page - 1) * 8, page * 8);

  if (!open || !group) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[680px] max-h-[88vh] flex flex-col rounded-2xl overflow-hidden"
        style={{
          background: "var(--bgCard)",
          border: "1px solid var(--border)",
          boxShadow: "0 24px 72px rgba(0,0,0,0.25)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* header */}
        <div
          className="flex items-center gap-3 px-5 py-4 border-b flex-shrink-0"
          style={{ borderColor: "var(--border)" }}
        >
          <span className="text-2xl">{group.emoji || "💬"}</span>

          <div className="flex-1">
            <div className="font-display font-bold text-[16px] text-[var(--text)]">
              {group.name}
            </div>

            <div className="text-[12px] text-[var(--textMuted)]">
              {msgs.length} messages · {group.members?.length || 0} members
            </div>
          </div>

          <div className="flex gap-2">
            {["all", "reported"].map((f) => (
              <button
                key={f}
                onClick={() => {
                  setFilter(f);
                  setPage(1);
                }}
                className="h-7 px-3 rounded-lg text-[11px] font-semibold border-none cursor-pointer capitalize"
                style={{
                  background:
                    filter === f ? "var(--teal)" : "var(--bgMuted)",
                  color:
                    filter === f ? "#fff" : "var(--textMuted)",
                }}
              >
                {f}
              </button>
            ))}
          </div>

          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center"
          >
            ✕
          </button>
        </div>

        {/* body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {paged.length === 0 ? (
            <div className="text-center py-10 text-[13px] text-[var(--textMuted)]">
              No messages.
            </div>
          ) : (
            paged.map((msg) => {
   const user = {
  id: msg.userId,
  name: msg.userName || "Member",
  email: msg.userEmail || "",
};

              return (
                <div
                  key={msg.id}
                  className="rounded-xl p-4 group"
                  style={{
                    background:
                     (msg.reportCount || 0) > 0
                        ? "var(--coralBg)"
                        : "var(--bgMuted)",
                    border: `1px solid ${
                    (msg.reportCount || 0) > 0
                        ? "var(--coral)20"
                        : "var(--border)"
                    }`,
                  }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex gap-3 flex-1 min-w-0">
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center text-[11px] font-bold text-white"
                        style={{
                          background:
                           [
  C.teal,
  C.navy,
  C.green,
  C.gold,
  C.coral,
][String(user.id || "").length % 5]
                        }}
                      >
                        {user.name?.slice(0, 2)}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-[13px]">
                            {user.name}
                          </span>

                          {
                          
                       (msg.reportCount || 0) > 0
                          
                          && (
                            <Badge
                              label={`${msg.reportCount} reports`}
                              variant="coral"
                            />
                          )}

                     

                          <span className="text-[11px] text-[var(--textMuted)]">
                            {msg.ts}
                          </span>
                        </div>

                        <p className="text-[13px] mt-1">
                          {msg.text}
                        </p>
                      </div>
                    </div>

             <div className="flex items-center gap-2 flex-wrap">
  <Button
    size="xs"
    variant="ghost"
    icon={Flag}
    onClick={() =>
      onReportMsg(group.id, msg.id)
    }
  >
    Report
  </Button>

  <Button
    size="xs"
    variant="ghost"
    icon={ShieldCheck}
    onClick={() => onWarnUser(user)}
  >
    Warn
  </Button>

<Button
  size="xs"
  variant="danger"
  icon={Trash2}
  onClick={() =>
    onDeleteMsg(group.id, msg.id)
  }
>
  Delete
</Button>
</div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {filtered.length > 8 && (
          <div
            className="px-5 py-3 border-t"
            style={{ borderColor: "var(--border)" }}
          >
            <Pager
              page={page}
              total={filtered.length}
              perPage={8}
              onChange={setPage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

// ───────────────── main ─────────────────
export const ACommunityMod = ({ showToast }) => {
  // groups
const groupsApi = useApi(api.community.adminGroups, { initial: [] });  // messages
  const allMsgsApi = useApi(api.community.adminAll, {
    initial: [],
  });

  // normalize groups
const groups = (groupsApi.data || []).map(g => ({
  id: g._id || g.id,
  slug: g.slug || "",
  name: g.name || "",
  emoji: g.emoji || "💬",
  coverColor: g.coverColor || C.teal,

  type: g.type || "public",
  messaging: g.messaging || "all",

  description: g.description || "",

  members: (g.members || []).map(m => ({
    id: m._id,
    name: m.name,
    email: m.email
  })),

  active: g.active !== false,

  reportCount: g.reportCount || 0,


  lastActivity: g.updatedAt
    ? new Date(g.updatedAt).toLocaleDateString()
    : "Recently"
}));

  // normalize messages
  const messages = useMemo(() => {
    return (allMsgsApi.data || []).reduce((acc, m) => {
      const gid =
        m.group?._id ||
        m.groupId ||
        m.group ||
        "_none";

 const uiMsg = {
id: m.id || m._id || m.messageId,
userEmail:
  m.userEmail ||
  m.author?.email ||
  "",
  groupId:
    m.groupId ||
    m.group?._id ||
    m.group ||
    "_none",

  userId:
    m.userId ||
    m.author?._id ||
    m.authorId ||
    0,

  userName:
    m.userName ||
    m.author?.name ||
    "Member",

  text:
    m.text ||
    m.content ||
    "",

  ts:
    m.ts ||
    formatDate(m.createdAt),

  createdAt: m.createdAt,

  reactions: m.reactions || {},

  reports: Array.isArray(m.reports) ? m.reports : [],
reportCount: m.reportCount || 0,


};

      if (!acc[gid]) acc[gid] = [];

      acc[gid].push(uiMsg);

      return acc;
    }, {});
  }, [allMsgsApi.data]);

  const [tab, setTab] = useState("overview");
  const [chatGroup, setChatGroup] = useState(null);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [page, setPage] = useState(1);
const [showCreate, setShowCreate] = useState(false);

const [messagePage, setMessagePage] =useState(1);
const MESSAGE_PER = 12;
const [newGroup, setNewGroup] = useState({
  name: "",
  description: "",
  emoji: "💬",
  type: "public",
  active: true,
});
  // derived
  const allMsgs = Object.values(messages).flat();
const reported = allMsgs.filter(
  (m) => (m.reportCount || 0) > 0
);

  const totalMembers = groups.reduce(
    (s, g) => s + (g.members?.length || 0),
    0
  );

  const activeGroups = groups.filter(
    (g) => g.active !== false
  );

  // filtered groups
  const filteredGroups = useMemo(() => {
    let list = [...groups];

    if (typeFilter !== "all") {
      if (typeFilter === "active")
        list = list.filter((g) => g.active !== false);
      else if (typeFilter === "inactive")
        list = list.filter((g) => g.active === false);
      else list = list.filter((g) => g.type === typeFilter);
    }

    if (search) {
      list = list.filter((g) =>
        g.name
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    return list;
  }, [groups, typeFilter, search]);

  const pagedGroups = filteredGroups.slice(
    (page - 1) * PER,
    page * PER
  );
const createGroup = async () => {
  try {
    if (!newGroup.name.trim()) {
      showToast("Group name is required.");
      return;
    }

    await api.community.create({
      name: newGroup.name,
      description: newGroup.description,
      emoji: newGroup.emoji,
      type: newGroup.type,
      active: newGroup.active,
    });

    await groupsApi.reload();

    setShowCreate(false);

    setNewGroup({
      name: "",
      description: "",
      emoji: "💬",
      type: "public",
      active: true,
    });

    showToast("Group created.");
  } catch {
    showToast("Failed to create group.");
  }
};
  // actions
  const deleteMessage = async (groupId, msgId) => {
    try {
   if (api.community.deleteMessage) {
  await api.community.deleteMessage(groupId, msgId);
}

      await allMsgsApi.reload();

      showToast("Message deleted.");
    } catch {
      showToast("Failed to delete message.");
    }
  };
const reportMessage = async (groupId, msgId) => {
  try {
    await api.community.reportMessage(groupId, msgId, {
      reason: "Admin flagged message",
    });

    await allMsgsApi.reload();

    showToast("Message reported.");
  } catch {
    showToast("Failed to report message.");
  }
};
 

  const updateGroup = async (id, patch) => {
    try {
      if (api.community.update) {
        await api.community.update(id, patch);
      }

      await groupsApi.reload();

      showToast("Group updated.");
    } catch {
      showToast("Failed to update group.");
    }
  };
const filteredMsgs = allMsgs;

const pagedMsgs = filteredMsgs.slice(
  (messagePage - 1) * MESSAGE_PER,
  messagePage * MESSAGE_PER
);


const totalPages = Math.ceil(
  filteredMsgs.length / MESSAGE_PER
);

const getPageNumbers = () => {
  const pages = [];

  if (totalPages <= 7) {
    return Array.from(
      { length: totalPages },
      (_, i) => i + 1
    );
  }

  pages.push(1);

  if (messagePage > 3) {
    pages.push("...");
  }

  const start = Math.max(2, messagePage - 1);
  const end = Math.min(
    totalPages - 1,
    messagePage + 1
  );

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (messagePage < totalPages - 2) {
    pages.push("...");
  }

  pages.push(totalPages);

  return pages;
};


  return (
    <div>
      {/* header */}
 <div className="flex items-center justify-between mb-5">
  <div>
    <h1 className="font-display font-bold text-xl text-[var(--text)]">
      Community Management
    </h1>

    <p className="text-[13px] text-[var(--textMuted)] mt-0.5">
      Monitor groups, review reports,
      manage members and messages.
    </p>
  </div>

  <Button
    icon={Plus}
    onClick={() => setShowCreate(true)}
  >
    Add Group
  </Button>
</div>

      {/* tabs */}
      <div className="flex bg-[var(--bgCard)] rounded-xl border border-[var(--border)] mb-5 overflow-hidden">
        {[
          {
            id: "overview",
            label: "Overview",
          },
          {
            id: "groups",
            label: `All Groups (${groups.length})`,
          },
          {
            id: "messages",
            label: "Live Feed",
          },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className="flex-1 py-2.5 text-[13px] font-semibold"
            style={{
              color:
                tab === t.id
                  ? "var(--teal)"
                  : "var(--textMuted)",
              borderBottom:
                tab === t.id
                  ? "2px solid var(--teal)"
                  : "2px solid transparent",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* overview */}
      {tab === "overview" && (
        <>
          <div className="grid grid-cols-4 gap-4 mb-5">
            <StatPill
              label="Total Groups"
              value={groups.length}
              color={C.teal}
            />

            <StatPill
              label="Active Groups"
              value={activeGroups.length}
              color={C.green}
            />

            <StatPill
              label="Total Members"
              value={totalMembers}
              color={C.navy}
            />

            <StatPill
              label="Reported Msgs"
              value={reported.length}
              color={
                reported.length > 0
                  ? C.coral
                  : C.green
              }
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            {groups.map((g) => {
              const msgs = messages[g.id] || [];

              return (
                <div
                  key={g.id}
                  className="rounded-2xl p-5 border cursor-pointer"
                  style={{
                    background: "var(--adminCard)",
                    borderColor: "var(--border)",
                    borderLeft: `4px solid ${g.coverColor}`,
                  }}
                  onClick={() => setChatGroup(g)}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">
                      {g.emoji}
                    </span>

                    <div>
                      <div className="font-display font-bold text-[14px]">
                        {g.name}
                      </div>

                      <div className="text-[11px] text-[var(--textMuted)]">
                        {g.type}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div
                      className="rounded-xl py-2 text-center"
                      style={{
                        background: "var(--bgMuted)",
                      }}
                    >
                      <div className="font-bold">
                        {g.members?.length || 0}
                      </div>

                      <div className="text-[10px]">
                        members
                      </div>
                    </div>

                    <div
                      className="rounded-xl py-2 text-center"
                      style={{
                        background: "var(--bgMuted)",
                      }}
                    >
                      <div className="font-bold">
                        {msgs.length}
                      </div>

                      <div className="text-[10px]">
                        messages
                      </div>
                    </div>

                    <div
                      className="rounded-xl py-2 text-center"
                      style={{
                        background: "var(--bgMuted)",
                      }}
                    >
                      <div className="font-bold">
                        {totalReactions(msgs)}
                      </div>

                      <div className="text-[10px]">
                        reactions
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* groups */}
      {tab === "groups" && (
        <>
          <div className="flex items-center gap-3 mb-4">
            <SearchBar
              value={search}
              onChange={(v) => {
                setSearch(v);
                setPage(1);
              }}
              placeholder="Search groups…"
              className="max-w-[280px] flex-1"
            />

            <Select
              value={typeFilter}
              onChange={(e) => {
                setTypeFilter(e.target.value);
                setPage(1);
              }}
            >
              <option value="all">All</option>
              <option value="public">Public</option>
              <option value="private">Private</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </Select>
          </div>

          <Card noPad>
            <Table
              cols={[
                {
                  key: "name",
                  label: "Group",

                  render: (_, g) => (
                    <div className="flex items-center gap-3">
                      <span className="text-xl">
                        {g.emoji}
                      </span>

                      <div>
                        <div className="font-semibold text-[13px]">
                          {g.name}
                        </div>

                        <div className="text-[11px] text-[var(--textMuted)]">
                          {g.description}
                        </div>
                      </div>
                    </div>
                  ),
                },

                {
                  key: "members",
                  label: "Members",

                  render: (_, g) =>
                    g.members?.length || 0,
                },

                {
                  key: "active",
                  label: "Status",

                  render: (_, g) => (
                    <Toggle
                      checked={g.active !== false}
                      onChange={(v) =>
                        updateGroup(g.id, {
                          active: v,
                        })
                      }
                    />
                  ),
                },

                {
                  key: "id",
                  label: "",

                  render: (_, g) => (
                    <div className="flex gap-1">
                      <Button
                        size="xs"
                        variant="ghost"
                        icon={Eye}
                        onClick={() =>
                          setChatGroup(g)
                        }
                      >
                        View
                      </Button>
                      <Button
  size="xs"
  variant="danger"
  icon={Trash2}
  onClick={async () => {
    await api.community.delete(g.id);
    await groupsApi.reload();
    showToast("Group deleted.");
  }}
>
  Delete
</Button>
                    </div>
                  ),
                },
              ]}
              rows={pagedGroups}
              empty="No groups found."
            />

            <div className="px-4">
              <Pager
                page={page}
                total={filteredGroups.length}
                perPage={PER}
                onChange={setPage}
              />
            </div>
          </Card>
        </>
      )}

      {/* messages */}
   {tab === "messages" && (
  <Card className="p-5">
    <div className="flex items-center justify-between mb-4">
      <div className="font-semibold text-[15px]">
        Live Message Feed
      </div>

      <div className="text-[13px] text-[var(--textMuted)]">
        Total Messages: {allMsgs.length}
      </div>
    </div>

    <div className="space-y-3">
      {pagedMsgs.length === 0 ? (
        <div className="text-center py-10 text-[13px] text-[var(--textMuted)]">
          No messages found.
        </div>
      ) : (
        pagedMsgs.map((msg) => {
          const group = groups.find(
            (g) => g.id === msg.groupId
          );

          return (
            <div
              key={msg.id}
              className="rounded-xl p-4 border"
              style={{
                background:
                  (msg.reportCount || 0) > 0
                    ? "var(--coralBg)"
                    : "var(--bgMuted)",

                borderColor:
                  (msg.reportCount || 0) > 0
                    ? "var(--coral)"
                    : "var(--border)",
              }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-3 flex-1">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-[12px]"
                    style={{
                      background: group?.coverColor || C.teal,
                    }}
                  >
                    {msg.userName?.slice(0, 2)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-[13px]">
                        {msg.userName}
                      </span>

                      <Badge
                        label={group?.name || "Unknown Group"}
                        variant="teal"
                      />

                      {(msg.reportCount || 0) > 0 && (
                        <Badge
                          label={`${msg.reportCount} reports`}
                          variant="coral"
                        />
                      )}

                      <span className="text-[11px] text-[var(--textMuted)]">
                        {msg.ts}
                      </span>
                    </div>

                    <p className="text-[13px] mt-1 break-words">
                      {msg.text}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    size="xs"
                    variant="ghost"
                    icon={Flag}
                    onClick={() =>
                      reportMessage(
                        msg.groupId,
                        msg.id
                      )
                    }
                  >
                    Report
                  </Button>

                  <Button
                    size="xs"
                    variant="danger"
                    icon={Trash2}
                    onClick={() =>
                      deleteMessage(
                        msg.groupId,
                        msg.id
                      )
                    }
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          );
        })
      )}
      <div className="mt-5">
<div className="flex items-center justify-center mt-5">
  <div className="text-[12px] text-[var(--textMuted)]">
    Showing{" "}
    <span className="font-semibold">
      {(messagePage - 1) * MESSAGE_PER + 1}
    </span>
    -
    <span className="font-semibold">
      {Math.min(
        messagePage * MESSAGE_PER,
        filteredMsgs.length
      )}
    </span>{" "}
    of{" "}
    <span className="font-semibold">
      {filteredMsgs.length}
    </span>{" "}
    messages
  </div>

  <div className="flex items-center gap-1">
    {/* prev */}
    <button
      disabled={messagePage === 1}
      onClick={() =>
        setMessagePage((p) => Math.max(p - 1, 1))
      }
      className="h-8 px-3 rounded-lg border text-[12px] font-medium disabled:opacity-40"
      style={{
        borderColor: "var(--border)",
        background: "var(--bgCard)",
      }}
    >
      Prev
    </button>

    {/* numbers */}
    {Array.from(
      {
        length: Math.ceil(
          filteredMsgs.length / MESSAGE_PER
        ),
      },
      (_, i) => i + 1
    ).map((p) => (
      <button
        key={p}
        onClick={() => setMessagePage(p)}
        className="w-8 h-8 rounded-lg text-[12px] font-semibold"
        style={{
          background:
            p === messagePage
              ? "var(--teal)"
              : "var(--bgCard)",

          color:
            p === messagePage
              ? "#fff"
              : "var(--text)",

          border:
            p === messagePage
              ? "none"
              : "1px solid var(--border)",
        }}
      >
        {p}
      </button>
    ))}

    {/* next */}
    <button
      disabled={
        messagePage ===
        Math.ceil(
          filteredMsgs.length / MESSAGE_PER
        )
      }
      onClick={() =>
        setMessagePage((p) =>
          Math.min(
            p + 1,
            Math.ceil(
              filteredMsgs.length / MESSAGE_PER
            )
          )
        )
      }
      className="h-8 px-3 rounded-lg border text-[12px] font-medium disabled:opacity-40"
      style={{
        borderColor: "var(--border)",
        background: "var(--bgCard)",
      }}
    >
      Next
    </button>
  </div>
</div>
</div>
    </div>
  </Card>
)}

<Modal
  open={showCreate}
  onClose={() => setShowCreate(false)}
  title="Create Group"
>
  <div className="space-y-4">
    <Input
      label="Group Name"
      value={newGroup.name}
      onChange={(e) =>
        setNewGroup((s) => ({
          ...s,
          name: e.target.value,
        }))
      }
    />

    <Input
      label="Description"
      value={newGroup.description}
      onChange={(e) =>
        setNewGroup((s) => ({
          ...s,
          description: e.target.value,
        }))
      }
    />

    <Input
      label="Emoji"
      value={newGroup.emoji}
      onChange={(e) =>
        setNewGroup((s) => ({
          ...s,
          emoji: e.target.value,
        }))
      }
    />

    <Select
      value={newGroup.type}
      onChange={(e) =>
        setNewGroup((s) => ({
          ...s,
          type: e.target.value,
        }))
      }
    >
      <option value="public">Public</option>
      <option value="private">Private</option>
    </Select>

    <div className="flex justify-end gap-2 pt-2">
      <Button
        variant="ghost"
        onClick={() => setShowCreate(false)}
      >
        Cancel
      </Button>

      <Button onClick={createGroup}>
        Create
      </Button>
    </div>
  </div>
</Modal>
      {/* modal */}
      <ChatModal
        open={!!chatGroup}
        onClose={() => setChatGroup(null)}
        group={chatGroup}
        messages={messages}
        onDeleteMsg={deleteMessage}

        onWarnUser={(u) =>
          showToast(`Warning sent to ${u.name}.`)
        }
        onReportMsg={reportMessage}
        showToast={showToast}
      />
    </div>
  );
};