import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import store from '../../../../store/store';
import SigninForm from '../signin-form';
import { useAuth } from '../../../../hooks/use-auth';

// Mock the hooks and modules
jest.mock('../../../../hooks/use-auth');
jest.mock('react-hot-toast');

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('SigninForm', () => {
  const queryClient = new QueryClient();
  const mockHandleLogin = jest.fn();
  const mockSetSession = jest.fn();

  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({
      handleLogin: mockHandleLogin,
      setSession: mockSetSession,
    });
  });

  const renderSigninForm = () => {
    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <SigninForm />
          </BrowserRouter>
        </QueryClientProvider>
      </Provider>
    );
  };

  it('renders signin form with all elements', () => {
    renderSigninForm();
    
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
    expect(screen.getByText(/create account/i)).toBeInTheDocument();
    expect(screen.getByText(/forgot password/i)).toBeInTheDocument();
  });

  it('shows validation errors for empty form submission', async () => {
    renderSigninForm();
    
    const submitButton = screen.getByText(/sign in/i);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    });
  });

  it('handles successful login', async () => {
    mockHandleLogin.mockResolvedValueOnce({
      status: 200,
      data: { data: { token: 'fake-token' } },
    });

    renderSigninForm();

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByText(/sign in/i);

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockHandleLogin).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
      expect(mockSetSession).toHaveBeenCalledWith('fake-token');
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });

  it('handles failed login', async () => {
    mockHandleLogin.mockResolvedValueOnce({
      status: 401,
    });

    renderSigninForm();

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByText(/sign in/i);

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/invalid email or password/i)).toBeInTheDocument();
    });
  });
}); 