"use client";

import AdminShell from "@/components/admin/AdminShell";
import ProjectForm from "@/components/admin/ProjectForm";

export default function NewProject() {
  return (
    <AdminShell title="Yeni Proje">
      <ProjectForm />
    </AdminShell>
  );
}
