import { useState, useEffect, useCallback } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { db } from './firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Highlight from '@tiptap/extension-highlight';
import LinkExtension from '@tiptap/extension-link';
import './tiptap.css';
import { FaBold, FaItalic, FaListUl, FaTrash, FaEdit, FaEye, FaImage, FaHighlighter, FaSearch, FaPlus } from 'react-icons/fa';

interface Item {
  id?: string;
  title: string;
  content: string;
  images: string[];
}

type CollectionType = 'blog' | 'publications';

function useCollection(name: CollectionType): [Item[], React.Dispatch<React.SetStateAction<Item[]>>, () => void] {
  const [items, setItems] = useState<Item[]>([]);
  const fetchItems = useCallback(() => {
    getDocs(collection(db, name)).then(snapshot => {
      setItems(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Item)));
    });
  }, [name]);
  useEffect(() => { fetchItems(); }, [fetchItems]);
  return [items, setItems, fetchItems];
}

export default function AdminDashboard() {
  const [tab, setTab] = useState<CollectionType>('blog');
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  return (
    <div style={{ background: '#fff', minHeight: '100vh', padding: 0, overflowX: 'hidden', boxSizing: 'border-box', display: 'flex', justifyContent: 'center' }}>
      <div style={{ maxWidth: 900, width: '100%', padding: '2rem 1rem', boxSizing: 'border-box', overflowX: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
          <div style={{ background: '#f7f7fa', borderRadius: 8, boxShadow: '0 2px 8px #0001', padding: '12px 20px', display: 'flex', alignItems: 'center', flex: 1, minWidth: 0, overflow: 'hidden' }}>
            <FaSearch style={{ color: '#646cff', fontSize: 18, marginRight: 8 }} />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: 18, flex: 1, color: '#222', minWidth: 0 }}
            />
            <AdminTabs tab={tab} setTab={setTab} />
          </div>
          <button
            onClick={() => { setModalOpen(true); setEditingItem(null); }}
            style={{ background: '#646cff', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 20px', fontWeight: 600, fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}
          >
            <FaPlus /> New
          </button>
        </div>
        <AdminSection
          key={tab + refreshKey}
          type={tab}
          search={search}
          onEdit={item => { setEditingItem(item); setModalOpen(true); }}
        />
        {modalOpen && (
          <AdminModal
            type={tab}
            item={editingItem}
            onClose={() => { setModalOpen(false); setEditingItem(null); }}
            onDone={() => { setModalOpen(false); setEditingItem(null); setRefreshKey(k => k + 1); }}
          />
        )}
      </div>
    </div>
  );
}

function AdminTabs({ tab, setTab }: { tab: CollectionType, setTab: (t: CollectionType) => void }) {
  return (
    <div style={{ display: 'flex', gap: 0, marginLeft: 16 }}>
      {['blog', 'publications'].map((t) => (
        <button
          key={t}
          onClick={e => { e.stopPropagation(); setTab(t as CollectionType); }}
          style={{
            padding: '8px 20px',
            border: 'none',
            borderBottom: tab === t ? '3px solid #646cff' : '3px solid transparent',
            background: tab === t ? '#fff' : 'transparent',
            color: tab === t ? '#646cff' : '#888',
            fontWeight: tab === t ? 700 : 500,
            fontSize: 16,
            cursor: 'pointer',
            outline: 'none',
            transition: 'all 0.2s',
            borderRadius: '8px 8px 0 0',
          }}
        >
          {t.charAt(0).toUpperCase() + t.slice(1)}
        </button>
      ))}
    </div>
  );
}

const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/den37vzvt/image/upload';
const CLOUDINARY_UPLOAD_PRESET = 'zccs_unsigned';

function AdminSection({ type, search, onEdit }: { type: CollectionType, search: string, onEdit: (item: Item) => void }) {
  const [items, , fetchItems] = useCollection(type);
  const [deleting, setDeleting] = useState<string | null>(null);

  // Truncate and fade text
  function getPreviewText(html: string, maxLength = 180) {
    const div = document.createElement('div');
    div.innerHTML = html;
    const text = div.textContent || div.innerText || '';
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  }

  const filtered = items.filter(item =>
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    (item.content && item.content.toLowerCase().includes(search.toLowerCase()))
  );

  const handleDelete = async (id: string | undefined) => {
    if (!id) return;
    setDeleting(id);
    await deleteDoc(doc(db, type, id));
    fetchItems();
    setDeleting(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {filtered.map(item => (
        <div key={item.id} style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #0001', padding: 24, width: '100%', maxWidth: '100%', minWidth: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <h3 style={{ fontSize: 26, fontWeight: 700, color: '#222', flex: 1, margin: 0 }}>{item.title}</h3>
            <button onClick={() => onEdit(item)} style={{ background: 'none', border: 'none', color: '#646cff', fontSize: 20, marginRight: 8, cursor: 'pointer' }} title="Edit"><FaEdit /></button>
            <button onClick={() => handleDelete(item.id)} style={{ background: 'none', border: 'none', color: '#e74c3c', fontSize: 20, cursor: 'pointer' }} title="Delete" disabled={deleting === item.id}>{deleting === item.id ? '...' : <FaTrash />}</button>
          </div>
          <div style={{ color: '#444', fontSize: 18, margin: '12px 0 18px 0', width: '100%', maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', position: 'relative' }}>
            <span style={{ background: 'linear-gradient(to right, #444 60%, #fff0 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{getPreviewText(item.content)}</span>
          </div>
          <button onClick={() => window.open(`/${type}/${item.id}`, '_blank')} style={{ background: '#646cff', color: '#fff', border: 'none', borderRadius: 4, padding: '8px 20px', fontWeight: 600, fontSize: 16, cursor: 'pointer', alignSelf: 'flex-end' }}><FaEye style={{ marginRight: 6 }} />View</button>
        </div>
      ))}
    </div>
  );
}

function AdminModal({ type, item, onClose, onDone }: { type: CollectionType, item: Item | null, onClose: () => void, onDone: () => void }) {
  const [form, setForm] = useState<Item>(item || { title: '', content: '', images: [] });
  const [uploading, setUploading] = useState(false);
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [highlightColor, setHighlightColor] = useState('#ffff00');
  const [imageWidth, setImageWidth] = useState('300');
  const [imageHeight, setImageHeight] = useState('auto');
  const editor = useEditor({
    extensions: [StarterKit, Image, Highlight.configure({ multicolor: true }), LinkExtension.configure({ openOnClick: true, HTMLAttributes: { target: '_blank', rel: 'noopener noreferrer' } })],
    content: form.content,
    editorProps: {
      attributes: {
        class: 'tiptap',
        style: 'color: #222; background: #fff;',
      },
    },
    onUpdate: ({ editor }: { editor: any }) => {
      setForm(f => ({ ...f, content: editor.getHTML() }));
    },
  });
  useEffect(() => {
    if (editor && form.content !== editor.getHTML()) {
      editor.commands.setContent(form.content || '<p></p>');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);
  // Toolbar for TipTap
  const MenuBar = useCallback(() => (
    <div style={{ marginBottom: 8, display: 'flex', gap: 8, alignItems: 'center', background: '#f7f7fa', borderRadius: 6, padding: '6px 10px', border: '1px solid #e0e0e0', flexWrap: 'wrap' }}>
      <button type="button" title="Bold" onClick={() => editor?.chain().focus().toggleBold().run()} disabled={!editor?.can().chain().focus().toggleBold().run()} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: '#646cff' }}><FaBold /></button>
      <button type="button" title="Italic" onClick={() => editor?.chain().focus().toggleItalic().run()} disabled={!editor?.can().chain().focus().toggleItalic().run()} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: '#646cff' }}><FaItalic /></button>
      <button type="button" title="Bullet List" onClick={() => editor?.chain().focus().toggleBulletList().run()} disabled={!editor} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: '#646cff' }}><FaListUl /></button>
      <button type="button" title="Highlight" onMouseDown={e => e.preventDefault()} onClick={() => editor?.chain().focus().toggleHighlight({ color: highlightColor }).run()} disabled={!editor} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: highlightColor }}><FaHighlighter /></button>
      <input type="color" value={highlightColor} onChange={e => setHighlightColor(e.target.value)} style={{ width: 24, height: 24, border: 'none', background: 'none', cursor: 'pointer', marginLeft: 4, marginRight: 8 }} title="Highlight color" onMouseDown={e => e.stopPropagation()} />
      <button type="button" title="Insert Link" onClick={() => {
        const text = prompt('Text for link:');
        if (!text) return;
        const url = prompt('URL:');
        if (!url) return;
        editor?.chain().focus().insertContent(`<a href='${url}' target='_blank' rel='noopener noreferrer'>${text}</a>`).run();
      }} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: '#646cff' }}>🔗</button>
      <button type="button" title="Insert Image" onClick={() => setShowImageDialog(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: '#646cff' }}><FaImage /></button>
    </div>
  ), [editor, highlightColor]);
  const handleImageDialogChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };
  const handleImageInsert = async () => {
    if (!imageFile) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    const res = await fetch(CLOUDINARY_UPLOAD_URL, {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    if (editor) {
      editor.chain().focus().setImage({ src: data.secure_url }).run();
    }
    setForm(f => ({ ...f, images: [...f.images, data.secure_url] }));
    setUploading(false);
    setShowImageDialog(false);
    setImageFile(null);
    setImageWidth('300');
    setImageHeight('auto');
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (item && item.id) {
      await updateDoc(doc(db, type, item.id), form as any);
    } else {
      await addDoc(collection(db, type), form as any);
    }
    setForm({ title: '', content: '', images: [] });
    if (editor) editor.commands.setContent('');
    onDone();
  };
  const handleClose = () => {
    setForm({ title: '', content: '', images: [] });
    if (editor) editor.commands.setContent('');
    onClose();
  };
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(30,30,40,0.18)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 16px #0002', padding: 32, minWidth: 340, maxWidth: 540, width: '100%', position: 'relative', boxSizing: 'border-box' }}>
        <h2 style={{ margin: 0, marginBottom: 16, color: '#646cff', fontWeight: 700 }}>{item ? 'Edit' : 'New'} {type.slice(0, -1).charAt(0).toUpperCase() + type.slice(1, -1).slice(1)}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
            required
            style={{ display: 'block', marginBottom: 8, width: '100%', fontSize: 20, fontWeight: 600, color: '#222', border: '1px solid #e0e0e0', borderRadius: 4, padding: 8, background: '#f7f7fa' }}
          />
          {editor && <MenuBar />}
          <EditorContent editor={editor} style={{ border: '1px solid #e0e0e0', minHeight: 120, marginBottom: 8, borderRadius: 4, padding: 8, background: '#fff', color: '#222', maxWidth: '100%', overflowX: 'auto' }} />
          <input
            type="file"
            style={{ display: 'none' }}
            id="modal-image-upload-input"
            accept="image/*"
            onChange={handleImageDialogChange}
          />
          {showImageDialog && (
            <div style={{ background: '#fff', border: '1px solid #e0e0e0', borderRadius: 8, padding: 16, marginBottom: 12, boxShadow: '0 2px 8px #0001', position: 'relative', zIndex: 100 }}>
              <label style={{ display: 'block', marginBottom: 8 }}>
                Choose image:
                <input type="file" accept="image/*" onChange={handleImageDialogChange} />
              </label>
              <label style={{ display: 'block', marginBottom: 8 }}>
                Width (px):
                <input type="number" value={imageWidth} onChange={e => setImageWidth(e.target.value)} style={{ marginLeft: 8, width: 80 }} placeholder="e.g. 300" min={1} />
              </label>
              <label style={{ display: 'block', marginBottom: 8 }}>
                Height (px or 'auto'):
                <input type="text" value={imageHeight} onChange={e => setImageHeight(e.target.value)} style={{ marginLeft: 8, width: 80 }} placeholder="e.g. auto or 200" />
              </label>
              <button type="button" onClick={handleImageInsert} disabled={!imageFile || uploading} style={{ marginRight: 8 }}>Insert</button>
              <button type="button" onClick={() => setShowImageDialog(false)}>Cancel</button>
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 16 }}>
            <button type="button" onClick={handleClose} style={{ background: '#eee', color: '#333', border: 'none', borderRadius: 4, padding: '10px 24px', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>Cancel</button>
            <button type="submit" disabled={uploading} style={{ background: '#646cff', color: '#fff', border: 'none', borderRadius: 4, padding: '10px 24px', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>{item ? 'Update' : 'Create'}</button>
          </div>
        </form>
      </div>
    </div>
  );
} 