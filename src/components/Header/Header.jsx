import Icon from '../Icon/Icon';
import { useTheme } from 'styled-components';
import { StyledHeader, Logo, ThemeToggle, Profile } from './HeaderStyles';
import { useGlobalContext } from '../App/context';

const Header = () => {
    const { colors } = useTheme();
    const { theme, toggleTheme } = useGlobalContext();

    return (
        <StyledHeader>
            <Logo aria-label="Home Page" />
            <ThemeToggle aria-label="Theme toggle" onClick={toggleTheme}>
                <Icon
                    name={theme === 'light' ? 'moon' : 'sun'}
                    size={20}
                    color={colors.btnTheme}
                    customStyle={{ transition: 'color 350ms ease-in-out' }}
                />
            </ThemeToggle>
            <Profile />
        </StyledHeader>
    );
};

export default Header;
