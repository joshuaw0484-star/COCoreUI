// app/features/garden-plan/api/planService.ts
import { api } from "~/api/client";
import { type GridPlotCell } from "~/features/garden-plan/components/PlotCell";

// TypeScript response mirror mapping your C# ContainerResponseDto fields perfectly
interface BackendContainerDto {
    id: string;
    name: string;
    containerType: number;
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
    getContainersByPlanId: async (planId: string): Promise<GridPlotCell[]> => {
        const response = await api.get<BackendContainerDto[]>(
            `/garden-plans/${planId}/containers`,
        );
        return response.data.map((dto) => ({
            id: dto.id,
            name: dto.name,
            containerType:
                dto.containerType === 1 ? "Outdoor Bed" : "Seed Tray",
            plantInstances: dto.plantIds.map((id, index) => ({
                instanceId: `allocated-fetched-${id}-${index}`,
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
                date: dto.name,
            })),
        }));
    },

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

    // ➕ NEW: Submits creation configuration packets to your MapPost endpoint
    createContainer: async (payload: {
        gardenPlanId: string;
        name: string;
        containerType: number;
    }): Promise<string> => {
        const response = await api.post<string>("/garden-containers", payload);
        return response.data; // Returns the generated Guid string
    },

    // ❌ NEW: Fires network DELETE commands down to your individual endpoint class execution pipe
    deleteContainer: async (containerId: string): Promise<void> => {
        await api.delete(`/garden-containers/${containerId}`);
    },
};
