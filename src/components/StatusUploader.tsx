import { useState  const addStatus = () => {
    const newStatus: GameStatus = {
      id: Date.now().toString(),
      badText: '',
      goodText: '',
      badImage: '',
      goodImage: ''
    };
    setStatuses([...statuses, newStatus]);
  };"react";
import type { GameStatus } from "../types/game";
import "./StatusUploader.css";

interface StatusUploaderProps {
  onStatusesUploaded: (statuses: GameStatus[]) => void;
  onClose: () => void;
}

const StatusUploader = ({
  onStatusesUploaded,
  onClose,
}: StatusUploaderProps) => {
  const [statuses, setStatuses] = useState<GameStatus[]>([
    { id: '1', badText: '', goodText: '', badImage: '', goodImage: '' }
  ]);

  const addStatus = () => {
    const newStatus: GameStatus = {
      id: Date.now().toString(),
      text: "",
      opposite: "",
    };
    setStatuses([...statuses, newStatus]);
  };

  const updateStatus = (
    id: string,
    field: "text" | "opposite",
    value: string
  ) => {
    setStatuses(
      statuses.map((status) =>
        status.id === id ? { ...status, [field]: value } : status
      )
    );
  };

  const removeStatus = (id: string) => {
    if (statuses.length > 1) {
      setStatuses(statuses.filter((status) => status.id !== id));
    }
  };

  const handleSubmit = () => {
    const validStatuses = statuses.filter(
      (status) => status.text.trim() !== "" && status.opposite.trim() !== ""
    );

    if (validStatuses.length > 0) {
      onStatusesUploaded(validStatuses);
      onClose();
    } else {
      alert("请至少添加一个完整的状态对！");
    }
  };

  return (
    <div className="status-uploader-overlay">
      <div className="status-uploader">
        <div className="uploader-header">
          <h2>自定义状态</h2>
          <button className="close-button" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="status-list">
          {statuses.map((status, index) => (
            <div key={status.id} className="status-item">
              <div className="status-number">{index + 1}</div>
              <div className="status-inputs">
                <div className="input-group">
                  <label>负面状态:</label>
                  <input
                    type="text"
                    value={status.text}
                    onChange={(e) =>
                      updateStatus(status.id, "text", e.target.value)
                    }
                    placeholder="例如: 论文被reject"
                  />
                </div>
                <div className="input-group">
                  <label>正面状态:</label>
                  <input
                    type="text"
                    value={status.opposite}
                    onChange={(e) =>
                      updateStatus(status.id, "opposite", e.target.value)
                    }
                    placeholder="例如: 论文被accept"
                  />
                </div>
              </div>
              {statuses.length > 1 && (
                <button
                  className="remove-button"
                  onClick={() => removeStatus(status.id)}
                >
                  删除
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="uploader-actions">
          <button className="add-button" onClick={addStatus}>
            添加新状态
          </button>
          <button className="submit-button" onClick={handleSubmit}>
            应用状态
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatusUploader;
