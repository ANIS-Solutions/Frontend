"use client";
import { useState } from "react";
import { useRewards } from "@/app/hooks/rewards/useRewards";
import { Reward } from "@/app/types/api/reward.types";
import RewardCard from "./RewardCard";
import RewardModal from "./RewardModal";
import { Gift } from "lucide-react";

type Filter = "ALL" | "ACTIVE" | "REDEEMED" | "EXPIRED";

const filters: { id: Filter; label: string }[] = [
  { id: "ALL", label: "All" },
  { id: "ACTIVE", label: "Active" },
  { id: "REDEEMED", label: "Redeemed" },
  { id: "EXPIRED", label: "Expired" },
];

interface RewardsListProps {
  childId: string;
}

export default function RewardsList({ childId }: RewardsListProps) {
  const { rewards, isLoading, error, refetch } = useRewards(childId);
  const [filter, setFilter] = useState<Filter>("ALL");
  const [modalOpen, setModalOpen] = useState(false);
  const [editReward, setEditReward] = useState<Reward | null>(null);

  const getRewardState = (reward: Reward) => {
    const isRedeemed = reward.redemptionType === "ONCE" && reward.timesRedeemed >= 1;
    const isExpired = !isRedeemed && new Date(reward.deadline) < new Date();
    if (isRedeemed) return "REDEEMED";
    if (isExpired) return "EXPIRED";
    return "ACTIVE";
  };

  const filtered = filter === "ALL"
    ? rewards
    : rewards.filter((r) => getRewardState(r) === filter);

  const stats = {
    total: rewards.length,
    active: rewards.filter((r) => getRewardState(r) === "ACTIVE").length,
    redeemed: rewards.filter((r) => getRewardState(r) === "REDEEMED").length,
    totalPoints: rewards.reduce((sum, r) => sum + r.pointsCost, 0),
  };

  const handleEdit = (reward: Reward) => {
    setEditReward(reward);
    setModalOpen(true);
  };

  const handleAdd = () => {
    setEditReward(null);
    setModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="rounded-2xl h-16 animate-pulse bg-gray-100 dark:bg-gray-700" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 rounded-xl text-sm" style={{ background: "#FCEBEB", color: "#A32D2D" }}>
        {error}
        <button onClick={refetch} className="ml-2 underline">Retry</button>
      </div>
    );
  }

  return (
    <>
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        {[
          { label: "Total Rewards", value: stats.total, color: "var(--stat-neutral)" },
          { label: "Active", value: stats.active, color: "var(--stat-warning)" },
          { label: "Redeemed", value: stats.redeemed, color: "var(--stat-success)" },
          { label: "Total Points", value: stats.totalPoints, color: "var(--stat-primary)" },
        ].map(({ label, value, color }) => (
          <div
            key={label}
            className="rounded-2xl p-4 bg-white dark:bg-gray-800 border-[0.5px] border-gray-200 dark:border-gray-700"
          >
            <p className="text-xs mb-1.5 text-gray-500 dark:text-gray-400">{label}</p>
            <p className="text-2xl font-bold" style={{ color }}>{value}</p>
          </div>
        ))}
      </div>

      {/* Filter + Add Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
        <div className="w-full sm:w-auto overflow-x-auto">
          <div className="flex gap-1 p-1 rounded-xl min-w-max bg-gray-100 dark:bg-gray-700">
            {filters.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setFilter(id)}
                className={`px-3 py-1.5 rounded-lg text-xs transition-all whitespace-nowrap ${
                  filter === id
                    ? "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-medium"
                    : "bg-transparent text-gray-500 dark:text-gray-400"
                }`}
                style={{
                  border: "none",
                  cursor: "pointer",
                  boxShadow: filter === id ? "0 1px 2px rgba(0,0,0,0.08)" : "none",
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleAdd}
          className="w-full sm:w-auto px-4 py-2 rounded-xl text-sm font-medium text-white shrink-0"
          style={{ background: "#1E73BE", border: "none", cursor: "pointer" }}
        >
          + Add Reward
        </button>
      </div>

      {/* Rewards */}
      {filtered.length === 0 ? (
        <div
          className="rounded-2xl p-8 text-center bg-gray-50 dark:bg-gray-900 border-[0.5px] border-dashed border-gray-300 dark:border-gray-700"
        >
          <Gift size={32} className="mx-auto mb-2 text-gray-300 dark:text-gray-600" />
          <p className="text-sm font-medium mb-1 text-gray-400 dark:text-gray-500">
            {rewards.length === 0 ? "No rewards yet" : "No rewards match this filter"}
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            {rewards.length === 0 ? "Add a reward to get started" : "Try a different filter"}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((reward) => (
            <RewardCard
              key={reward.id}
              reward={reward}
              onEdit={handleEdit}
              onRefetch={refetch}
            />
          ))}
        </div>
      )}

      <RewardModal
        key={editReward?.id || "new"}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={refetch}
        childId={childId}
        editReward={editReward}
      />
    </>
  );
}