import { useState } from 'react';
import { AlertCircle, ArrowLeft, Trash2, Info, Lock } from 'lucide-react';
import Navbar from '../components/Navbar/Navbar';
import { deleteUserAccount } from '../service/userdata/deleteUserAccount';
import { useNavigate } from 'react-router-dom';
import { notifyError } from '../lib/Toast';
import SetUserDataToStore from '../service/userdata/SetDataToStore';

function DeleteAccount() {
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    if (!agreedToTerms) {
      setShowWarning(true);
      return;
    }

    if (!password) {
      setPasswordError('Please enter your password to confirm deletion');
      return;
    }

    setIsDeleting(true);
    
    try {
      const result = await deleteUserAccount(password);
      
      if (result.success) {
        localStorage.removeItem('loggedin');
        location.reload();
        navigate('/');
      } else {
        setPasswordError(result.error || 'Failed to delete account. Please check your password.');
        notifyError(result.error || "something went wrong");
      }
    } catch (error) {
      setPasswordError('An error occurred. Please try again.');
      console.error('Error deleting account:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className=''>
      <Navbar show={false} />
      <div className="container mx-auto  px-4 max-w-3xl py-16">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-2xl font-bold text-red-600 flex items-center">
            <Trash2 className="mr-2" size={24} />
            Delete Your Account
          </h1>
          
          <hr className="my-4 border-gray-200" />
          
          <h2 className="text-xl font-semibold flex items-center">
            <Info className="mr-2" size={20} />
            Please read carefully before proceeding
          </h2>
          
          <div className="bg-gray-50 p-4 my-4 rounded-md max-h-[300px] overflow-auto border border-gray-200">
            <p className="font-bold mb-2">
              Terms and Conditions for Account Deletion:
            </p>
            
            <p className="text-sm mb-2">
              1. Once your account is deleted, all your personal information, preferences, and activity history will be permanently removed from our system.
            </p>
            
            <p className="text-sm mb-2">
              2. Any active bookings or reservations associated with your account will be canceled.
            </p>
            
            <p className="text-sm mb-2">
              3. You will lose access to any credits, points, or benefits associated with your account.
            </p>
            
            <p className="text-sm mb-2">
              4. This action cannot be undone. If you wish to use our services in the future, you will need to create a new account.
            </p>
            
            <p className="text-sm mb-2">
              5. If you have any outstanding payments or fees, these will still need to be settled regardless of account deletion.
            </p>
            
            <p className="text-sm mb-2">
              6. We may retain certain information as required by law or for legitimate business purposes for a limited period.
            </p>
          </div>
          
          {showWarning && (
            <div className="flex items-center bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-md my-4">
              <AlertCircle className="mr-2" size={18} />
              You must agree to the terms before deleting your account.
            </div>
          )}
          
          <div className="flex items-center mt-4">
            <label className="flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={agreedToTerms} 
                onChange={(e) => {
                  setAgreedToTerms(e.target.checked);
                  if (e.target.checked) setShowWarning(false);
                }}
                className="mr-2 h-5 w-5 accent-red-500"
              />
              <span className="text-gray-800">
                I understand and agree to the terms of account deletion
              </span>
            </label>
          </div>
          
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Enter your password to confirm deletion
            </label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError('');
                }}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                placeholder="Your current password"
              />
            </div>
            {passwordError && (
              <p className="mt-1 text-sm text-red-600">{passwordError}</p>
            )}
          </div>
          
          <div className="mt-8 flex justify-between">
            <button 
              className="flex items-center p-1 md:px-4 md:py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="mr-2" size={16} />
              Cancel
            </button>
            
            <button 
              className={`flex items-center p-1 md:px-4 md:py-2 rounded-md ${
                agreedToTerms 
                  ? "bg-red-600 text-white hover:bg-red-700" 
                  : "bg-red-200 text-red-500 cursor-not-allowed"
              }`}
              onClick={handleDeleteAccount}
              disabled={!agreedToTerms || isDeleting}
            >
              <Trash2 className="mr-2" size={16} />
              {isDeleting ? 'Deleting...' : 'Delete Account'}
            </button>
          </div>
        </div>
      </div>
       <SetUserDataToStore/>
    </div>
  );
}

export default DeleteAccount;