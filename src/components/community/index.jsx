import { useState } from "react";
import { CommunityProvider, useCommunity } from "./CommunityContext";
import { GroupList, CreateGroupModal } from "./GroupList";
import { GroupChat } from "./GroupChat";

// Inner shell (must be inside CommunityProvider)
const Shell = ({ showToast, onGoHome }) => {
  const { createGroup }                    = useCommunity();
  const [activeGroup, setActiveGroup]      = useState(null);
  const [createOpen, setCreateOpen]        = useState(false);

  return (
    <div className="flex flex-col" style={{ height:"100%", background:"var(--bg)" }}>
      {activeGroup ? (
        <GroupChat
          groupId={activeGroup}
          onBack={() => setActiveGroup(null)}
        />
      ) : (
        <GroupList
          onOpenGroup={setActiveGroup}
          onCreateGroup={() => setCreateOpen(true)}
          onGoHome={onGoHome}
        />
      )}

      <CreateGroupModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreate={(data) => {
          const id = createGroup(data);
          setCreateOpen(false);
          setActiveGroup(id);
        }}
      />
    </div>
  );
};

// Exported — wraps provider
export const WebCommunity = ({ showToast, onGoHome }) => (
  <CommunityProvider>
    <Shell showToast={showToast} onGoHome={onGoHome}/>
  </CommunityProvider>
);
