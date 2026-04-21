import { useCallback, useEffect, useState } from "react";
import {
  addChild,
  getChild,
  getMyChildren,
  updateChild,
} from "../services/child.service";
import {
  AddChildPayload,
  Child,
  updateChildPayload,
} from "../types/api/child.types";


//Get All Children
export function useChildren() {
  const [children, setChildren] = useState<Child[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchChildren = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getMyChildren();
      setChildren(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchChildren();
  }, [fetchChildren]);

  return { children, loading, error, refetch: fetchChildren };
}
//Get Single Child
export function useChild(childId: string) {
  const [child, setChild] = useState<Child | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchChild = useCallback(async () => {
    if (!childId) return;
    setLoading(true);
    setError(null);
    try {
      const data = await getChild(childId);
      setChild(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, [childId]);

  useEffect(() => {
    fetchChild();
  }, [fetchChild]);

  return { child, loading, error, refetch: fetchChild };
}

//Add Child
export function useAddChild() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const add = async (payload: AddChildPayload): Promise<Child | null> => {
    setLoading(true);
    setError(null);
    try {
      const data = await addChild(payload);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { add, loading, error };
}

//update child
export function useUpdateChild() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = async (
    childId: string,
    payload: updateChildPayload,
  ): Promise<Child | null> => {
    setLoading(true);
    setError(null);
    try {
      const data = await updateChild(childId, payload);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { update, loading, error };
}
