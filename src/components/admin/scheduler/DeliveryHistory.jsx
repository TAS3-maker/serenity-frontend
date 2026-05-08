import { useMemo, useState } from "react";
import { Badge, Card, Pager } from "../../ui/index";
import { Table } from "../../ui/Table";

const PER = 10;

export const DeliveryHistory = ({ history = [] }) => {
  const [page, setPage] = useState(1);

  // ✅ normalize backend data
  const rows = useMemo(() => {
    return history.map((item) => ({
      id: item._id,

      recipient:
        item.recipient?.name ||
        item.recipient?.email ||
        "Unknown User",

      email:
        item.recipient?.email || "—",

      mission:
        item.subject || "Untitled Mission",

      channel:
        item.channel || "inapp",

      trigger:
        item.trigger || "manual",

      status:
        item.status || "sent",

      date: item.createdAt
        ? new Date(item.createdAt).toLocaleString()
        : "—",
    }));
  }, [history]);

  const paginated = rows.slice(
    (page - 1) * PER,
    page * PER
  );

  const COLS = [
    {
      key: "recipient",
      label: "Recipient",
      render: (v, m) => (
        <div>
          <div className="text-[13px] font-medium text-[var(--text)]">
            {v}
          </div>

          <div className="text-[11px] text-[var(--textMuted)]">
            {m.email}
          </div>
        </div>
      ),
    },

    {
      key: "mission",
      label: "Mission",
      render: (v) => (
        <span className="text-[13px] font-medium text-[var(--text)]">
          {v}
        </span>
      ),
    },

    {
      key: "channel",
      label: "Channel",
      render: (v) => (
        <Badge
          label={v}
          variant={
            v === "push"
              ? "gold"
              : v === "email"
              ? "grey"
              : "green"
          }
        />
      ),
    },

    {
      key: "trigger",
      label: "Trigger",
      render: (v) => (
        <span className="text-[12px] text-[var(--textMuted)] capitalize">
          {v}
        </span>
      ),
    },

    {
      key: "status",
      label: "Status",
      render: (v) => (
        <Badge
          label={v}
          variant={
            v === "sent"
              ? "green"
              : "gold"
          }
        />
      ),
    },

    {
      key: "date",
      label: "Date",
      render: (v) => (
        <span className="text-[12px] text-[var(--textMuted)] whitespace-nowrap">
          {v}
        </span>
      ),
    },
  ];

  return (
    <Card
      title="Delivery History"
      sub="All mission deliveries from manual sends and schedulers"
      noPad
    >
      <Table
        cols={COLS}
        rows={paginated}
        empty="No delivery history yet."
      />

      <div className="px-4 flex justify-center items-center">
        <Pager
          page={page}
          total={rows.length}
          perPage={PER}
          onChange={(p) => {
            setPage(p);
          }}
        />
      </div>
    </Card>
  );
};