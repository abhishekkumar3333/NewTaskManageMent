import React, { useState } from 'react';
import api from '../api/axios';
import Layout from '../components/Layout';
import Button from '../components/Button';
import Input from '../components/Input';
import { Copy, Check, Plus } from 'lucide-react';
import Modal from '../components/Modal';

const Teams = () => {
  const [activeTab, setActiveTab] = useState('create');
  const [teamName, setTeamName] = useState('');
  const [createdTeam, setCreatedTeam] = useState(null);
  
  const [viewTeamId, setViewTeamId] = useState('');
  const [projects, setProjects] = useState([]);
  const [searching, setSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState('');
  
  const [myMemberId, setMyMemberId] = useState('');
  const [newProject, setNewProject] = useState({ title: '', description: '' });
  const [creatingProject, setCreatingProject] = useState(false);

  const handleCreateTeam = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/team/create', { name: teamName });
      if (response.data.sucess) { 
        setCreatedTeam(response.data.team);
        setTeamName('');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to create team');
    }
  };

  const fetchProjects = async (e) => {
    e.preventDefault();
    setSearching(true);
    setHasSearched(true);
    setError('');
    setProjects([]);
    setViewTeamId('');
    try {
      const response = await api.get(`/project/${viewTeamId}/getspecificproject`);
      if (response.data.sucess) {
        setProjects(response.data.projects);
        if (response.data.projects.length === 0) {
            setIsModalOpen(true);
        } else {
            setIsModalOpen(false);
        }
      } else { 
         setError('No projects found or team does not exist');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch projects. Check the Team ID.');
    } finally {
      setSearching(false);
    }
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    setCreatingProject(true);
    try {
      const payload = {
        title: newProject.title,
        description: newProject.description,
        teamId: viewTeamId,
        projectId: myMemberId, 
      };
      
      const response = await api.post('/project/create', payload);
      if (response.data.sucess) {
        alert('Project created!');
        setNewProject({ title: '', description: '' });
        setIsModalOpen(false);
        fetchProjects({ preventDefault: () => {} }); // Reload projects
      }
    } catch (err) {
        console.error(err);
        alert('Failed to create project. Ensure Member ID is correct and belongs to this team.');
    } finally {
        setCreatingProject(false);
    }
  };

  const CopyField = ({ label, value }) => {
    const [copied, setCopied] = useState(false);
    
    const onCopy = () => {
        navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex flex-col gap-1 mb-3">
            <span className="text-xs text-secondary font-medium">{label}</span>
            <div className="flex items-center gap-2 bg-black/20 p-2 rounded border border-border" style={{borderColor: 'var(--border-color)'}}>
                <code className="text-sm flex-1 truncate">{value}</code>
                <button onClick={onCopy} className="text-secondary hover:text-primary transition-colors">
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                </button>
            </div>
        </div>
    );
  };

  return (
    <Layout>
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl font-bold text-primary mb-2">Teams & Projects</h1>
        <p className="text-secondary">Manage your teams and collaborate on projects.</p>
      </div>

      <div className="flex gap-4 mb-4 border-b border-border " style={{borderColor: 'var(--border-color)'}} >
        <button
            className={`pb-3 px-2 font-medium transition-colors mb-6 w-200  ${activeTab === 'create' ? 'text-primary border-b-2 border-primary' : 'text-secondary hover:text-primary'}`}
            onClick={() => setActiveTab('create')}
        >
            Create Team
        </button>
        <button
            className={`pb-3 px-2 font-medium transition-colors ${activeTab === 'view' ? 'text-primary border-b-2 border-primary' : 'text-secondary hover:text-primary'}`}
            onClick={() => setActiveTab('view')}
        >
            View Projects
        </button>
      </div>

      {activeTab === 'create' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
            <div className="card">
                <h2 className="text-xl font-semibold mb-4 text-primary">Create New Team</h2>
                <form onSubmit={handleCreateTeam}>
                    <Input 
                        label="Team Name"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        required
                        placeholder="e.g. Engineering Team"
                    />
                    <Button type="submit">Create Team</Button>
                </form>
            </div>

            {createdTeam && (
                <div className="card border-primary bg-primary/5">
                    <h2 className="text-xl font-semibold mb-4 text-primary">Team Created!</h2>
                    <p className="text-sm text-secondary mb-4">
                        Please save these IDs. You will need them to manage projects.
                        <br />
                        <span className="text-yellow-500">Note: This is the ONLY time you will see your Member ID.</span>
                    </p>
                    
                    <CopyField label="Team ID" value={createdTeam.id} />
                    {createdTeam.members && createdTeam.members.length > 0 && (
                        <CopyField label="Your Member ID (for Project Creation)" value={createdTeam.members[0].id} />
                    )}
                </div>
            )}
        </div>
      )}

      {activeTab === 'view' && (
        <div className="flex flex-col gap-8 animate-fade-in">
            <div className="card">
                <h2 className="text-xl font-semibold mb-4 text-primary">Find Team Projects</h2>
                <form onSubmit={fetchProjects} className="flex gap-4 items-end">
                    <div className="flex-1">
                        <Input 
                            value={viewTeamId}
                            onChange={(e) => setViewTeamId(e.target.value)}
                            required
                            placeholder="Paste Team ID here..."
                             
                        />
                    </div>
                    <Button type="submit" disabled={searching} className="mb-4">{searching ? 'Searching...' : 'Search'}</Button>
                </form>
                {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
            </div>

            {projects.length > 0 && (
                <div className="flex flex-col gap-6">
                    <div className="flex justify-between items-center mt-3">
                        <h3 className="text-lg font-semibold text-secondary">Projects ({projects.length})</h3>
                        <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2">
                            <Plus size={18} />
                            Add Project
                        </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map(proj => (
                            <div key={proj.id} className="card bg-tertiary/30 border-transparent hover:border-primary transition-colors">
                                <h4 className="font-bold text-lg mb-2 text-primary">{proj.title}</h4>
                                <p className="text-secondary text-sm line-clamp-3">{proj.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            
            {projects.length === 0 && !error && !searching && hasSearched && (
                 <div className="text-center text-secondary p-8 bg-secondary/50 rounded-lg flex flex-col items-center gap-4">
                    <p>No projects found for this team.</p>
                    <p className="text-sm">You can create one if you have a valid Member ID.</p>
                    <Button onClick={() => setIsModalOpen(true)}>
                        Create First Project
                    </Button>
                 </div>
            )}

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Project">
                <form onSubmit={handleCreateProject} className="flex flex-col gap-4">
                    <Input 
                        label="My Member ID"
                        value={myMemberId}
                        onChange={(e) => setMyMemberId(e.target.value)}
                        required
                        placeholder="Paste Member ID..."
                    />
                    <Input 
                        label="Project Title"
                        value={newProject.title}
                        onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                        required
                        placeholder="Project Title"
                    />
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-secondary">Description</label>
                        <textarea
                            className="input-field min-h-[100px] resize-none p-3 rounded-lg bg-tertiary text-text-primary border border-border focus:border-primary outline-none transition-all"
                            value={newProject.description}
                            onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                            required
                            placeholder="Description..."
                            style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-tertiary)' }}
                        />
                    </div>
                    <Button type="submit" disabled={creatingProject} className="w-full mt-2">
                        {creatingProject ? 'Creating...' : 'Create Project'}
                    </Button>
                </form>
            </Modal>
        </div>
      )}
    </Layout>
  );
};

export default Teams;
