"use client";

import { useEffect, useState } from "react";
import { markdownToHtml } from "@/lib/markdown";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Post {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  contentMd: string;
  content: string;
  featured?: boolean;
}

type View = "list" | "create" | "edit";

const CATEGORIES = ["Reprogrammation", "Diagnostic", "Électronique", "Actualité", "Conseil"];
const TOKEN_KEY = "ace_admin_token";
const today = new Date().toISOString().split("T")[0];

// ─── Styles partagés ──────────────────────────────────────────────────────────

const S = {
  input: {
    width: "100%",
    background: "#16181D",
    border: "1px solid #3D4250",
    borderRadius: "4px",
    padding: "0.65rem 0.9rem",
    color: "#f0f1f5",
    fontFamily: "var(--font-body)",
    fontSize: "1rem",
    outline: "none",
    boxSizing: "border-box" as const,
  },
  label: {
    display: "block" as const,
    fontFamily: "var(--font-display)",
    fontSize: "0.65rem",
    fontWeight: 700,
    letterSpacing: "0.2em",
    textTransform: "uppercase" as const,
    color: "#777b88",
    marginBottom: "0.4rem",
  },
  btnRed: {
    background: "#e63946",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontFamily: "var(--font-display)",
    fontSize: "0.72rem",
    fontWeight: 700,
    letterSpacing: "0.1em",
    textTransform: "uppercase" as const,
    padding: "0.65rem 1.5rem",
    borderRadius: "4px",
  },
  btnGhost: {
    background: "none",
    color: "#b0b4c0",
    border: "1px solid #3D4250",
    cursor: "pointer",
    fontFamily: "var(--font-display)",
    fontSize: "0.72rem",
    fontWeight: 700,
    letterSpacing: "0.1em",
    textTransform: "uppercase" as const,
    padding: "0.65rem 1.5rem",
    borderRadius: "4px",
  },
};

// ─── Composant principal ──────────────────────────────────────────────────────

export default function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setToken(sessionStorage.getItem(TOKEN_KEY));
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (!token) {
    return (
      <LoginView
        onLogin={(t) => {
          sessionStorage.setItem(TOKEN_KEY, t);
          setToken(t);
        }}
      />
    );
  }

  return (
    <AdminView
      token={token}
      onLogout={() => {
        sessionStorage.removeItem(TOKEN_KEY);
        setToken(null);
      }}
    />
  );
}

// ─── Connexion ────────────────────────────────────────────────────────────────

function LoginView({ onLogin }: { onLogin: (token: string) => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Erreur");
      } else {
        onLogin(data.token);
      }
    } catch {
      setError("Erreur réseau");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#16181D",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          background: "#111318",
          border: "1px solid #3D4250",
          borderRadius: "8px",
          padding: "2.5rem",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.3rem",
            fontWeight: 800,
            letterSpacing: "0.08em",
            color: "#f0f1f5",
            margin: "0 0 0.25rem",
          }}
        >
          ACE<span style={{ color: "#e63946" }}>PROG</span>
        </p>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.9rem",
            color: "#777b88",
            margin: "0 0 2rem",
          }}
        >
          Espace administration
        </p>

        <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div>
            <label style={S.label}>Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={S.input}
              placeholder="••••••••"
              required
              autoFocus
            />
          </div>
          {error && (
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.9rem",
                color: "#e63946",
                margin: 0,
              }}
            >
              {error}
            </p>
          )}
          <button type="submit" style={{ ...S.btnRed, opacity: loading ? 0.6 : 1 }} disabled={loading}>
            {loading ? "Connexion…" : "Se connecter"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── Interface admin ──────────────────────────────────────────────────────────

function AdminView({ token, onLogout }: { token: string; onLogout: () => void }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [view, setView] = useState<View>("list");
  const [editing, setEditing] = useState<Post | null>(null);
  const [loadError, setLoadError] = useState("");

  const loadPosts = async () => {
    try {
      const res = await fetch("/api/posts");
      setPosts(await res.json());
    } catch {
      setLoadError("Impossible de charger les articles.");
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const openCreate = () => {
    setEditing(null);
    setView("create");
  };

  const openEdit = (post: Post) => {
    setEditing(post);
    setView("edit");
  };

  const handleSaved = () => {
    loadPosts();
    setView("list");
  };

  const handleDelete = async (slug: string, title: string) => {
    if (!confirm(`Supprimer "${title}" ? Cette action est irréversible.`)) return;
    await fetch(`/api/posts/${slug}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    loadPosts();
  };

  const handleToggleFeatured = async (slug: string, currentlyFeatured: boolean) => {
    await fetch(`/api/posts/${slug}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ featured: !currentlyFeatured }),
    });
    loadPosts();
  };

  return (
    <div style={{ minHeight: "100vh", background: "#16181D" }}>
      {/* Header */}
      <header
        style={{
          background: "#111318",
          borderBottom: "1px solid #3D4250",
          padding: "1rem 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.1rem",
              fontWeight: 800,
              letterSpacing: "0.08em",
              color: "#f0f1f5",
            }}
          >
            ACE<span style={{ color: "#e63946" }}>PROG</span>
          </span>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "0.65rem",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#777b88",
            }}
          >
            Admin
          </span>
        </div>
        <button
          onClick={onLogout}
          style={{
            ...S.btnGhost,
            fontSize: "0.65rem",
            padding: "0.4rem 1rem",
          }}
        >
          Déconnexion
        </button>
      </header>

      {/* Contenu */}
      <main style={{ maxWidth: "1100px", margin: "0 auto", padding: "2.5rem 2rem" }}>
        {view === "list" && (
          <PostList
            posts={posts}
            loadError={loadError}
            onNew={openCreate}
            onEdit={openEdit}
            onDelete={handleDelete}
            onToggleFeatured={handleToggleFeatured}
          />
        )}
        {(view === "create" || view === "edit") && (
          <PostForm
            token={token}
            post={editing}
            onSaved={handleSaved}
            onCancel={() => setView("list")}
          />
        )}
      </main>
    </div>
  );
}

// ─── Liste des articles ───────────────────────────────────────────────────────

function PostList({
  posts,
  loadError,
  onNew,
  onEdit,
  onDelete,
  onToggleFeatured,
}: {
  posts: Post[];
  loadError: string;
  onNew: () => void;
  onEdit: (p: Post) => void;
  onDelete: (slug: string, title: string) => void;
  onToggleFeatured: (slug: string, currentlyFeatured: boolean) => void;
}) {
  const fmt = (iso: string) =>
    new Date(iso).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "2rem",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.4rem",
            fontWeight: 800,
            color: "#f0f1f5",
            margin: 0,
          }}
        >
          Articles ({posts.length})
        </h1>
        <button onClick={onNew} style={S.btnRed}>
          + Nouvel article
        </button>
      </div>

      {loadError && (
        <p style={{ color: "#e63946", fontFamily: "var(--font-body)" }}>{loadError}</p>
      )}

      {posts.length === 0 && !loadError && (
        <p style={{ color: "#777b88", fontFamily: "var(--font-body)" }}>
          Aucun article. Cliquez sur &quot;Nouvel article&quot; pour commencer.
        </p>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {posts.map((post) => (
          <div
            key={post.slug}
            style={{
              background: "#111318",
              border: "1px solid #3D4250",
              borderRadius: "6px",
              padding: "1.25rem 1.5rem",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "0.55rem",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#e63946",
                background: "rgba(230,57,70,0.1)",
                padding: "0.15rem 0.5rem",
                borderRadius: "3px",
                whiteSpace: "nowrap",
              }}
            >
              {post.category}
            </span>
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.8rem",
                color: "#777b88",
                whiteSpace: "nowrap",
              }}
            >
              {fmt(post.date)}
            </span>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "0.9rem",
                fontWeight: 700,
                color: "#f0f1f5",
                flex: 1,
                minWidth: "180px",
              }}
            >
              {post.title}
            </span>
            <div style={{ display: "flex", gap: "0.5rem", marginLeft: "auto", flexWrap: "wrap" }}>
              <button
                onClick={() => onToggleFeatured(post.slug, !!post.featured)}
                title={post.featured ? "Retirer de la une" : "Mettre à la une"}
                style={{
                  background: post.featured ? "rgba(230,57,70,0.15)" : "transparent",
                  color: post.featured ? "#e63946" : "#777b88",
                  border: `1px solid ${post.featured ? "#e63946" : "#3D4250"}`,
                  cursor: "pointer",
                  fontFamily: "var(--font-display)",
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  padding: "0.4rem 0.9rem",
                  borderRadius: "4px",
                  transition: "all 0.2s",
                }}
              >
                {post.featured ? "★ À la une" : "☆ À la une"}
              </button>
              <button
                onClick={() => onEdit(post)}
                style={{
                  ...S.btnGhost,
                  fontSize: "0.65rem",
                  padding: "0.4rem 0.9rem",
                }}
              >
                Modifier
              </button>
              <button
                onClick={() => onDelete(post.slug, post.title)}
                style={{
                  background: "rgba(230,57,70,0.1)",
                  color: "#e63946",
                  border: "1px solid rgba(230,57,70,0.3)",
                  cursor: "pointer",
                  fontFamily: "var(--font-display)",
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  padding: "0.4rem 0.9rem",
                  borderRadius: "4px",
                }}
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

// ─── Formulaire article ───────────────────────────────────────────────────────

function PostForm({
  token,
  post,
  onSaved,
  onCancel,
}: {
  token: string;
  post: Post | null;
  onSaved: () => void;
  onCancel: () => void;
}) {
  const isEdit = !!post;

  const [title, setTitle] = useState(post?.title ?? "");
  const [category, setCategory] = useState(post?.category ?? "");
  const [date, setDate] = useState(post?.date ?? today);
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [contentMd, setContentMd] = useState(post?.contentMd ?? "");
  const [preview, setPreview] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = { title, category, date, excerpt, contentMd };
    const url = isEdit ? `/api/posts/${post!.slug}` : "/api/posts";
    const method = isEdit ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Erreur lors de l'enregistrement");
      } else {
        onSaved();
      }
    } catch {
      setError("Erreur réseau");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      {/* Titre page */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          marginBottom: "2rem",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={onCancel}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#e63946",
            fontFamily: "var(--font-display)",
            fontSize: "0.65rem",
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            padding: 0,
          }}
        >
          ← Retour
        </button>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.3rem",
            fontWeight: 800,
            color: "#f0f1f5",
            margin: 0,
          }}
        >
          {isEdit ? "Modifier l'article" : "Nouvel article"}
        </h1>
      </div>

      <form onSubmit={submit}>
        <div
          style={{
            background: "#111318",
            border: "1px solid #3D4250",
            borderRadius: "8px",
            padding: "2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}
        >
          {/* Titre */}
          <div>
            <label style={S.label}>Titre *</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={S.input}
              placeholder="Ex : Pourquoi calibrer son turbo avant un Stage 2 ?"
              required
            />
          </div>

          {/* Catégorie + Date */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <label style={S.label}>Catégorie *</label>
              <input
                list="cat-list"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={S.input}
                placeholder="Ex : Reprogrammation"
                required
              />
              <datalist id="cat-list">
                {CATEGORIES.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </div>
            <div>
              <label style={S.label}>Date de publication *</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={{ ...S.input, colorScheme: "dark" }}
                required
              />
            </div>
          </div>

          {/* Résumé */}
          <div>
            <label style={S.label}>Résumé (affiché dans la liste) *</label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              style={{
                ...S.input,
                minHeight: "80px",
                resize: "vertical",
              }}
              placeholder="1 à 2 phrases qui donnent envie de lire l'article."
              required
            />
          </div>

          {/* Contenu */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "0.4rem",
                flexWrap: "wrap",
                gap: "0.5rem",
              }}
            >
              <label style={{ ...S.label, margin: 0 }}>Contenu *</label>
              <button
                type="button"
                onClick={() => setPreview((v) => !v)}
                style={{
                  ...S.btnGhost,
                  fontSize: "0.6rem",
                  padding: "0.3rem 0.8rem",
                }}
              >
                {preview ? "Éditeur" : "Aperçu"}
              </button>
            </div>

            {!preview ? (
              <textarea
                value={contentMd}
                onChange={(e) => setContentMd(e.target.value)}
                style={{
                  ...S.input,
                  minHeight: "280px",
                  resize: "vertical",
                  fontFamily: "monospace",
                  fontSize: "0.9rem",
                  lineHeight: 1.6,
                }}
                placeholder={`Écrivez votre article ici.\n\n### Titre de section\n\nParagraphe normal. Vous pouvez mettre du texte **en gras** ou *en italique*.\n\n- Élément de liste\n- Autre élément\n\n[Lien](https://...)`}
                required
              />
            ) : (
              <div
                className="post-content"
                style={{
                  background: "#16181D",
                  border: "1px solid #3D4250",
                  borderRadius: "4px",
                  padding: "1.25rem",
                  minHeight: "280px",
                }}
                dangerouslySetInnerHTML={{
                  __html: contentMd
                    ? markdownToHtml(contentMd)
                    : '<p style="color:#777b88">Rien à afficher.</p>',
                }}
              />
            )}

            {/* Guide markdown */}
            <div
              style={{
                marginTop: "0.75rem",
                padding: "0.75rem 1rem",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid #2C303A",
                borderRadius: "4px",
                fontFamily: "monospace",
                fontSize: "0.78rem",
                color: "#777b88",
                lineHeight: 1.8,
              }}
            >
              <strong style={{ color: "#b0b4c0", fontFamily: "var(--font-display)", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                Guide de mise en forme
              </strong>
              <br />
              <code>### Titre</code> → titre de section &nbsp;|&nbsp;
              <code>**gras**</code> → <strong>gras</strong> &nbsp;|&nbsp;
              <code>*italique*</code> → <em>italique</em>
              <br />
              <code>- élément</code> → liste à puces &nbsp;|&nbsp;
              <code>[texte](lien)</code> → lien &nbsp;|&nbsp;
              ligne vide = nouveau paragraphe
            </div>
          </div>

          {/* Erreur */}
          {error && (
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.9rem",
                color: "#e63946",
                margin: 0,
              }}
            >
              {error}
            </p>
          )}

          {/* Actions */}
          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
            <button type="button" onClick={onCancel} style={S.btnGhost}>
              Annuler
            </button>
            <button
              type="submit"
              style={{ ...S.btnRed, opacity: saving ? 0.6 : 1 }}
              disabled={saving}
            >
              {saving ? "Enregistrement…" : isEdit ? "Mettre à jour" : "Publier l'article"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
