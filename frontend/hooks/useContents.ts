import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  listContents,
  createContent,
  updateContent,
  deleteContent,
  type Category,
  type ContentItem,
} from "@/services/contents";

const key = (category?: Category) => ["contents", category ?? "ALL"];

export function useContents(category?: Category) {
  return useQuery<ContentItem[]>({
    queryKey: key(category),
    queryFn: () => listContents(category),
  });
}

export function useCreateContent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createContent,
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: key(undefined) });
      if (vars.category) qc.invalidateQueries({ queryKey: key(vars.category) });
    },
  });
}

export function useUpdateContent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...rest }: { id: number; title: string; body: string; tag?: string; emoji?: string }) =>
      updateContent(id, rest),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["contents"] }),
  });
}

export function useDeleteContent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteContent(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["contents"] }),
  });
}
