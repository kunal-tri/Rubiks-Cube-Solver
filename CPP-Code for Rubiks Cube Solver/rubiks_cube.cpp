#include<iostream>
#include<vector>
#include<algorithm>
#include<map>
#include<random>
#include<ctime>
#include<string>
#include<fstream>

using namespace std;
enum Color {WHITE,GREEN,RED,BLUE,ORANGE,YELLOW};
enum Face {UP,LEFT,FRONT,RIGHT,BACK,DOWN};

class RubiksCube{
    private:
        vector<vector<vector<Color>>> cube;
        int move_count=0;

        void generateSVG(const string& filename){
            ofstream file(filename);
            if(!file.is_open()){
                cerr<<"Error : Could not open the file " <<filename<<endl;
                return;
            }

            map<Color,string> colorMap={
                {WHITE,"white"},{GREEN,"green"},
                {RED,"red"},{BLUE,"blue"},
                {ORANGE,"orange"},{YELLOW,"yellow"}   // ✅ fixed typo and extra semicolon
            };

            file << R"(<!DOCTYPE html>
            <html>
            <head>
            <title>Rubic's Cube State</title>
            <style>
                body{
                font-family: sans-serif;
                 display: flex;
                  justify-content: center;
                   align-items: center;
                    height: 100vh; margin: 0; 
                    background-color: #f0f0f0; }
                    .container { text-align: center; }
                h1 { color: #333; }
            </style>
            </head>
            <body>
            <div class="container">
            <h1>Cube State: Step )" << move_count << R"(</h1>
            <svg width="400" height="300" viewBox="0 0 12 9">)";

            const int s=1;
            int face_positions[6][2]={
                {3,0}, //UP
                {0,3}, //LEFT
                {3,3}, //FRONT
                {6,3}, //RIGHT
                {9,3}, //BACK
                {3,6} //DOWN
            };
            for(int f=0;f<6;++f){
                for(int r=0;r<3;++r){
                    for(int c=0;c<3;++c){
                        file<< R"(<rect x=")"<< face_positions[f][0] +c*s<<R"(" y=")"<< face_positions[f][1]+r*s <<R"(" width=")" << s << R"(" height=")" << s<< R"(" fill=")" << colorMap[cube[f][r][c]] << R"(" stroke="black" stroke-width="0.05"/>)" << endl;
                    }
                }
            }
            file<< R"(</svg>
                    </div>
                    </body>
                    </html>)";
            file.close();
        }

        void applyMoves(const string& moves){   // ✅ changed param name
            for (char move: moves){
                cout<<"MOVE: "<<move<<endl;
                 switch (move) {
                case 'U': u(); break; 
                case 'u': u_prime(); break;
                case 'D': d(); break;
                case 'd': d_prime(); break;
                case 'L': l(); break;
                case 'l': l_prime(); break;
                case 'R': r(); break;
                case 'r': r_prime(); break;
                case 'F': f(); break;
                case 'f': f_prime(); break;
                case 'B': b(); break;
                case 'b': b_prime(); break;
            }
            print();
            generateSVG("cube_step_" + to_string(++move_count) +".html");
            cout<< "----------------------------------------" << endl;

            }
        }

    public:
        RubiksCube(){
            cube.resize(6,vector<vector<Color>>(3,vector<Color>(3)));
            for (int i = 0; i < 6; ++i) {
                for (int j = 0; j < 3; ++j) {
                    for (int k = 0; k < 3; ++k) {
                        cube[i][j][k] = (Color)i;
                    }
                }
            }
        }

        void input(){
             map<char, Color> colorMap = {
                {'W', WHITE}, {'G', GREEN}, {'R', RED},
                {'B', BLUE}, {'O', ORANGE}, {'Y', YELLOW}
            };
            cout << "Enter the cube state (6 faces, 3x3 each, use W, G, R, B, O, Y):" << endl;
            string faces[] = {"UP", "LEFT", "FRONT", "RIGHT", "BACK", "DOWN"};

            for (int i = 0; i < 6; ++i) {
                cout << "\nEnter 9 colors for face " << faces[i] << " (row by row):" << endl;
                for (int j = 0; j < 3; ++j) {
                    for (int k = 0; k < 3; ++k) {
                        char color_char;
                        cin >> color_char;
                        if (colorMap.find(toupper(color_char)) == colorMap.end()) {
                            cout << "Invalid color. Please try again." << endl;
                            k--;
                        } else {
                            cube[i][j][k] = colorMap[toupper(color_char)];
                        }
                    }
                }
            }
        }

        void print() {
            map<Color, char> colorMap = {
                {WHITE, 'W'}, {GREEN, 'G'}, {RED, 'R'},
                {BLUE, 'B'}, {ORANGE, 'O'}, {YELLOW, 'Y'}
            };
            string faces[] = {"UP", "LEFT", "FRONT", "RIGHT", "BACK", "DOWN"};

            cout << "\n      " << faces[UP] << endl;
            for (int i = 0; i < 3; ++i) {
                cout << "      ";
                for (int j = 0; j < 3; ++j) {
                    cout << colorMap[cube[UP][i][j]] << " ";
                }
                cout << endl;
            }

            cout << endl;

            cout << faces[LEFT] << "   " << faces[FRONT] << "    " << faces[RIGHT] << "   " << faces[BACK] << endl;
            for (int i = 0; i < 3; ++i) {
                for (int j = 0; j < 3; ++j) cout << colorMap[cube[LEFT][i][j]] << " ";
                cout << "  ";
                for (int j = 0; j < 3; ++j) cout << colorMap[cube[FRONT][i][j]] << " ";
                cout << "  ";
                for (int j = 0; j < 3; ++j) cout << colorMap[cube[RIGHT][i][j]] << " ";
                cout << "  ";
                for (int j = 0; j < 3; ++j) cout << colorMap[cube[BACK][i][j]] << " ";
                cout << endl;
            }

            cout << endl;
            cout << "      " << faces[DOWN] << endl;
            for (int i = 0; i < 3; ++i) {
                cout << "      ";
                for (int j = 0; j < 3; ++j) {
                    cout << colorMap[cube[DOWN][i][j]] << " ";
                }
                cout << endl;
            }
        }

        // ✅ Added missing rotateFace
        void rotateFace(int face) {
            vector<vector<Color>> temp = cube[face];
            for (int i = 0; i < 3; ++i) {
                for (int j = 0; j < 3; ++j) {
                    cube[face][i][j] = temp[2 - j][i];
                }
            }
        }

        void rotateFacePrime(int face) {
            vector<vector<Color>> temp = cube[face];
            for (int i = 0; i < 3; ++i) {
                for (int j = 0; j < 3; ++j) {
                    cube[face][i][j] = temp[j][2 - i];
                }
            }
        }

        void u() { 
            rotateFace(UP);
            vector<Color> t = cube[FRONT][0];
            cube[FRONT][0] = cube[RIGHT][0];
            cube[RIGHT][0] = cube[BACK][0];
            cube[BACK][0] = cube[LEFT][0];
            cube[LEFT][0] = t;
            }
    void u_prime() 
    {
        rotateFacePrime(UP);
        vector<Color> t = cube[FRONT][0]; 
        cube[FRONT][0] = cube[LEFT][0]; 
        cube[LEFT][0] = cube[BACK][0]; 
        cube[BACK][0] = cube[RIGHT][0]; 
        cube[RIGHT][0] = t; 
    }
    void d() 
    { 
        rotateFace(DOWN); 
        vector<Color> t = cube[FRONT][2]; 
        cube[FRONT][2] = cube[LEFT][2]; 
        cube[LEFT][2] = cube[BACK][2]; 
        cube[BACK][2] = cube[RIGHT][2]; 
        cube[RIGHT][2] = t; }
    void d_prime() 
    { 
        rotateFacePrime(DOWN); 
        vector<Color> t = cube[FRONT][2]; 
        cube[FRONT][2] = cube[RIGHT][2]; 
        cube[RIGHT][2] = cube[BACK][2]; 
        cube[BACK][2] = cube[LEFT][2]; 
        cube[LEFT][2] = t; 
    }
    void l() 
    { 
        rotateFace(LEFT); 
        Color t[3]; 
        for(int i=0;i<3;i++) t[i]=cube[UP][i][0]; 
        for(int i=0;i<3;i++) cube[UP][i][0]=cube[BACK][2-i][2]; 
        for(int i=0;i<3;i++) cube[BACK][i][2]=cube[DOWN][2-i][0]; 
        for(int i=0;i<3;i++) cube[DOWN][i][0]=cube[FRONT][i][0]; 
        for(int i=0;i<3;i++) cube[FRONT][i][0]=t[i]; 
    }
    void l_prime()
    { 
        rotateFacePrime(LEFT); 
        Color t[3]; 
        for(int i=0;i<3;i++) t[i]=cube[UP][i][0]; 
        for(int i=0;i<3;i++) cube[UP][i][0]=cube[FRONT][i][0]; 
        for(int i=0;i<3;i++) cube[FRONT][i][0]=cube[DOWN][i][0]; 
        for(int i=0;i<3;i++) cube[DOWN][i][0]=cube[BACK][2-i][2]; 
        for(int i=0;i<3;i++) cube[BACK][2-i][2]=t[i]; 
    }
    void r() 
    { 
        rotateFace(RIGHT); 
        Color t[3]; 
        for(int i=0;i<3;i++) t[i]=cube[UP][i][2]; 
        for(int i=0;i<3;i++) cube[UP][i][2]=cube[FRONT][i][2]; 
        for(int i=0;i<3;i++) cube[FRONT][i][2]=cube[DOWN][i][2]; 
        for(int i=0;i<3;i++) cube[DOWN][i][2]=cube[BACK][2-i][0]; 
        for(int i=0;i<3;i++) cube[BACK][2-i][0]=t[i]; 
    }
    void r_prime() { 
        rotateFacePrime(RIGHT); 
        Color t[3]; 
        for(int i=0;i<3;i++) t[i]=cube[UP][i][2]; 
        for(int i=0;i<3;i++) cube[UP][i][2]=cube[BACK][2-i][0]; 
        for(int i=0;i<3;i++) cube[BACK][i][0]=cube[DOWN][2-i][2]; 
        for(int i=0;i<3;i++) cube[DOWN][i][2]=cube[FRONT][i][2]; 
        for(int i=0;i<3;i++) cube[FRONT][i][2]=t[i]; 
    }
    void f() { 
        rotateFace(FRONT); 
        Color t[3]; 
        for(int i=0;i<3;i++) t[i]=cube[UP][2][i]; 
        for(int i=0;i<3;i++) cube[UP][2][i]=cube[LEFT][2-i][2]; 
        for(int i=0;i<3;i++) cube[LEFT][i][2]=cube[DOWN][0][i]; 
        for(int i=0;i<3;i++) cube[DOWN][0][i]=cube[RIGHT][2-i][0]; 
        for(int i=0;i<3;i++) cube[RIGHT][i][0]=t[i]; 
    }
    void f_prime() { 
        rotateFacePrime(FRONT); 
        Color t[3]; 
        for(int i=0;i<3;i++) t[i]=cube[UP][2][i]; 
        for(int i=0;i<3;i++) cube[UP][2][i]=cube[RIGHT][i][0]; 
        for(int i=0;i<3;i++) cube[RIGHT][i][0]=cube[DOWN][0][2-i]; 
        for(int i=0;i<3;i++) cube[DOWN][0][i]=cube[LEFT][i][2]; 
        for(int i=0;i<3;i++) cube[LEFT][2-i][2]=t[i]; 
    }
    void b() { 
        rotateFace(BACK); 
        Color t[3]; 
        for(int i=0;i<3;i++) t[i]=cube[UP][0][i]; 
        for(int i=0;i<3;i++) cube[UP][0][i]=cube[RIGHT][i][2]; 
        for(int i=0;i<3;i++) cube[RIGHT][i][2]=cube[DOWN][2][2-i]; 
        for(int i=0;i<3;i++) cube[DOWN][2][i]=cube[LEFT][i][0]; 
        for(int i=0;i<3;i++) cube[LEFT][2-i][0]=t[i]; 
    }
    void b_prime() { 
        rotateFacePrime(BACK); 
        Color t[3]; 
        for(int i=0;i<3;i++) t[i]=cube[UP][0][i]; 
        for(int i=0;i<3;i++) cube[UP][0][i]=cube[LEFT][2-i][0]; 
        for(int i=0;i<3;i++) cube[LEFT][i][0]=cube[DOWN][2][i]; 
        for(int i=0;i<3;i++) cube[DOWN][2][i]=cube[RIGHT][2-i][2]; 
        for(int i=0;i<3;i++) cube[RIGHT][i][2]=t[i]; 
    }

    // Scrambles the cube with 25 random moves
    void scramble() {
        srand(time(0));
        string moves = "UuDdRrLlFfBb";
        cout << "Scrambling cube..." << endl;
        for (int i = 0; i < 25; ++i) {
            applyMoves(string(1, moves[rand() % 12]));
        }
        cout << "Scramble complete." << endl;
    }

    void solve() {
        cout << "\n--- Starting to Solve the Cube ---" << endl;
        generateSVG("cube_step_" + to_string(move_count) + ".html"); // Initial state
        
        cout << "\nStep 1: Solving the White Cross (Placeholder)" << endl;
        applyMoves("fulu");

        cout << "\nStep 2: Solving the White Corners (Placeholder)" << endl;
        applyMoves("ruru");

        cout << "\nStep 3: Solving the Middle Layer (Placeholder)" << endl;
        applyMoves("ururufuf");
        
        cout << "\nStep 4: Making the Yellow Cross (Placeholder)" << endl;
        applyMoves("fruruf");

        cout << "\nStep 5: Permuting the Yellow Edges (Placeholder)" << endl;
        applyMoves("rururuur");

        cout << "\nStep 6: Permuting the Yellow Corners (Placeholder)" << endl;
        applyMoves("urulurul");
        
        cout << "\nStep 7: Orienting the Yellow Corners (Placeholder)" << endl;
        applyMoves("rdrd");

        cout << "\n--- Cube Solved! (Theoretically) ---" << endl;
    }
};   

int main() {
    RubiksCube myCube;
    char choice;

    cout << "Welcome to the Rubik's Cube Solver!" << endl;
    cout << "(M)anually input cube state or (R)andomly scramble? ";
    cin >> choice;

    if (toupper(choice) == 'M') {
        myCube.input();
    } else {
        myCube.scramble();
    }

    cout << "\nYour Scrambled Cube:" << endl;
    myCube.print();

    myCube.solve();

    return 0;
}
