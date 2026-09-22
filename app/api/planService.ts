// app/features/garden-plan/api/planService.ts
import { api } from "~/api/client";
import { type GridPlotCell } from "~/features/garden-plan/components/PlotCell";

// TypeScript response mirror mapping your C# ContainerResponseDto fields perfectly
interface BackendContainerDto {
    id: string;
    name: string;
    containerType: number; // 1 = OutdoorBed, 2 = SeedTray
    plantIds: string[];
    tasks: { id: string; description: string; isDone: boolean }[];
    treatments: {
        id: string;
        type: string;
        source: string;
        quantity: string;
        date: string;
    }[];
}

export const planService = {
    /**
     * Hydrates the entire Canvas Grid from the newly renamed GetById endpoint
     */
    getContainersByPlanId: async (planId: string): Promise<GridPlotCell[]> => {
        const response = await api.get<BackendContainerDto[]>(
            `/garden-plans/${planId}/containers`,
        );

        // Project backend integer enums and schemas back to frontend UI states
        return response.data.map((dto) => ({
            id: dto.id,
            name: dto.name,
            containerType:
                dto.containerType === 1 ? "Outdoor Bed" : "Seed Tray",
            plantInstances: dto.plantIds.map((id, index) => ({
                instanceId: `allocated-fetched-${id}-${index}`, // Re-establish unique instance tracking tokens
                plantId: id,
            })),
            tasks: dto.tasks.map((t) => ({
                id: t.id,
                description: t.description,
                isDone: t.isDone,
            })),
            treatments: dto.treatments.map((st) => ({
                id: st.id,
                type: st.type,
                source: st.source,
                quantity: st.quantity,
                date: st.date,
            })),
        }));
    },

    /**
     * Synchronizes the stacked Inspector card parameters back to the .NET SyncState endpoint
     */
    syncContainerState: async (
        containerId: string,
        payload: {
            plantIds: string[];
            tasks: { description: string; isDone: boolean }[];
            treatments: { type: string; source: string; quantity: string }[];
        },
    ): Promise<void> => {
        await api.put(`/garden-containers/${containerId}/sync`, payload);
    },
};
