// IMPORT CONTAINER COMPONENTS
// import category from '../../components/category/categoryLayoutComponent';
// import attribute from '../../containers/attribute/attributeManagementContainer';
// import filter from '../../components/filter/filterLayoutComponent';
// import filterOption from '../../containers/filterOption/filterOptionContainer';
// import home from '../../containers/common/homeContainer';
// import productHoundContainer from '../../containers/productHound/productHoundContainer';
// import attributeReports from '../../containers/reports/attribute/attributeReports';
// import categoryReports from '../../containers/reports/category/categeryReports';
// import filterReports from '../../containers/reports/filter/filterReports';
// import synonyms from '../../containers/searchUtils/synonymContainer';

const LOAD_CONFIG = 'CLIENT/LOAD_CONFIG';

const initialState = {
    appName: 'TournamentDirectorHelper',     // REQUIRED FIELD
    boldTitle: 'Tournament Director',     // Optional
    title: ' Helper',        // Optional
    // headerImage: { src: '../../../../src/img/CatManIcon.png', type: 'image' },
    routes: [
        // {
        //    path: 'gettingStarted',  // name of the route
        //    "default": 'true',      // Indicates if this is the default route to load on application start
        //    navTitle: 'Forge',     // Title of nav element; leave nav elements empty if you do not want to have a UI nav element created
        //    selectedImage: 'src/img/forge_white_on_black.png',     // Image of nav element; leave nav elements if you do not want to have a UI nav element created
        //    unselectedImage: 'src/img/forge_black_on_white.png',     // Image of nav element; leave nav elements if you do not want to have a UI nav element created
        //    component: gettingStarted      // specifies the component to handle the route per the routeComponents dictionary defined in the index.js file
        // },
        {
            path: 'HomePage',  // name of the route
            default: 'true',      // Indicates if this is the default route to load on application start
            navTitle: 'My Home Page',     // Title of nav element; leave nav elements empty if you do not want to have a UI nav element created
            image: { src: 'src/img/home.png', type: 'image' }     // Image of nav element; leave nav elements if you do not want to have a UI nav element created
            // component: home      // specifies the component to handle the route per the routeComponents dictionary defined in the index.js file
        }
    ],
    loginImage: 'src/img/CatManIcon.png'
};

export default function config(state = initialState, action) {
    switch (action.type) {
        case LOAD_CONFIG:
            return state;
        default:
            return state;
    }
}
