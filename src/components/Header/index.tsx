import styles from './styles.module.css';
import logo from '../../assets/images/logo-variant2.png';
import logoHovered from '../../assets/images/logo-variant3.png';
import ImageLinkTransition from '../ImageLinkTransition';
import cartIcon from '../../assets/icons/cart-variant3.png';
import heartIcon from '../../assets/icons/heart.png';
import userIcon from '../../assets/icons/user.png';
import TextLinkUnderline from '../TextLinkUnderline';

export default function Header() {
    return(
        <>
            <header className={styles.headerSection}>

                <ImageLinkTransition
                    linkTo='/'
                    firstImg={logo}
                    secondImg={logoHovered}
                    width={144}
                    height={142}
                    firstAlt='logo'
                    secondAlt='logoHovered'>
                </ImageLinkTransition>
                
                <div className={styles.centerSection}>
                    <ul>
                        <li><TextLinkUnderline linkTo='/' text='PIJAMAS'></TextLinkUnderline></li>
                        <li><TextLinkUnderline linkTo='/' text='FEMININO'></TextLinkUnderline></li>
                        <li><TextLinkUnderline linkTo='/' text='MASCULINO' id={styles.textLink} idDiv={styles.textLinkDiv}></TextLinkUnderline></li>
                        <li><TextLinkUnderline linkTo='/' text='INFANTIL'></TextLinkUnderline></li>
                    </ul>
                </div>

                <div className={styles.iconsSection}>

                    <div className={styles.cartHeartBox}>
                        <ImageLinkTransition
                            linkTo='/'
                            firstImg={cartIcon}
                            secondImg={cartIcon}
                            width={27}
                            height={27}
                            firstAlt='cartIcon'
                            secondAlt='cartIconHovered'>
                        </ImageLinkTransition>
                        <ImageLinkTransition
                            linkTo='/'
                            firstImg={heartIcon}
                            secondImg={heartIcon}
                            width={27}
                            height={27}
                            firstAlt='heartIcon'
                            secondAlt='heartIconHovered'>
                        </ImageLinkTransition>
                    </div>

                    <ImageLinkTransition
                        linkTo='/'
                        firstImg={userIcon}
                        secondImg={userIcon}
                        width={56}
                        height={56}
                        firstAlt='userIcon'
                        secondAlt='userIconHovered'>
                    </ImageLinkTransition>

                </div>
            
            </header>
        </>
    )
}