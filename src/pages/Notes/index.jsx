import React, { useEffect, useState } from "react";
import {
  NavBar,
  List,
  FloatingBubble,
  TextArea,
  Input,
  Modal,
  Toast,
  Ellipsis,
} from "antd-mobile";
import { AddOutline, DeleteOutline, LeftOutline } from "antd-mobile-icons";
import dayjs from "dayjs";
import "./index.less";
import { NotesAtom } from '@/atoms/homeAtom';
import { useAtom } from 'jotai';

export default function NotesPage() {
  const [notes, setNotes] = useAtom(NotesAtom);
  const [activeNote, setActiveNote] = useState(null);
  const [showEditor, setShowEditor] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  // 初始化加载
  useEffect(() => {
    // const saved = JSON.parse(localStorage.getItem("mobile_notes") || "[]");
    // setNotes(saved);
  }, []);

  // 自动保存
  useEffect(() => {
    // localStorage.setItem("mobile_notes", JSON.stringify(notes));
  }, [notes]);

  // 新建笔记
  const handleAddNote = () => {
    const newNote = {
      id: Date.now(),
      title: "New Notes",
      content: "",
      time: dayjs().format("YYYY-MM-DD HH:mm"),
    };
    setNotes([newNote, ...notes]);
    setActiveNote(newNote);
    setShowEditor(true);
  };

  // 删除笔记
  const handleDeleteNote = () => {
    setNotes((prev) => prev.filter((n) => n.id !== activeNote.id));
    Toast.show("Note deleted");
    setShowDeleteModal(false);
    setShowEditor(false);
  };

  // 修改笔记内容
  const updateNote = (field, value) => {
    setNotes((prev) =>
      prev.map((n) =>
        n.id === activeNote.id
          ? {
            ...n,
            [field]: value,
            time: dayjs().format("YYYY-MM-DD HH:mm"),
          }
          : n
      )
    );
    setActiveNote((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="notes-container">
      {!showEditor ? (
        <>
          <NavBar backIcon={false}>Notes</NavBar>
          <List>
            {notes.length === 0 && (
              <div className="empty-tip">There are no notes yet. Click the lower right corner to create one!</div>
            )}
            {notes.map((note) => (
              <List.Item
                key={note.id}
                arrow={false}
                description={note.time}
                onClick={() => {
                  setActiveNote(note);
                  setShowEditor(true);
                }}
              >
                <div>{note.title || "Untitled Note"}</div>
                <Ellipsis direction='end' rows={3} content={note.content} />
              </List.Item>
            ))}
          </List>

          <FloatingBubble
            axis="xy"
            magnetic="x"
            onClick={handleAddNote}
            style={{
              '--initial-position-bottom': '0',
              '--initial-position-right': '0',
            }}
            onOffsetChange={offset => {
              setOffset(offset)
            }}
            offset={offset}
          >
            <AddOutline />
          </FloatingBubble>
        </>
      ) : (
        <>
          <NavBar
            // back={<LeftOutline />}
            onBack={() => setShowEditor(false)}
            right={
              <DeleteOutline
                onClick={() => setShowDeleteModal(true)}
                style={{ fontSize: 20 }}
              />
            }
          >
            <div>{`Editor's Notes`}</div>
          </NavBar>

          <div className="note-editor">
            <Input
              placeholder="Enter a title"
              value={activeNote?.title}
              onChange={(val) => updateNote("title", val)}
              clearable
              className="note-title-input"
            />
            <TextArea
              placeholder="Record your thoughts..."
              value={activeNote?.content}
              onChange={(val) => updateNote("content", val)}
              autoSize={{ minRows: 10 }}
              className="note-textarea"
            />
          </div>

          <Modal
            visible={showDeleteModal}
            content="Are you sure you want to delete this note?"
            closeOnMaskClick
            onClose={() => setShowDeleteModal(false)}
            actions={[
              { key: "cancel", text: "Cancel" },
              {
                key: "delete",
                text: "Delete",
                danger: true,
                onClick: handleDeleteNote,
              },
            ]}
          />
        </>
      )}
    </div>
  );
}
